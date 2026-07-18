import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateOTP, sendOTPEmail } from '@/lib/email';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'smartlink-secret-key';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

    if (!user) {
      return NextResponse.json({
        message: 'If an account exists with this email, a verification code has been sent.',
      });
    }

    await prisma.passwordReset.deleteMany({
      where: { email: normalizedEmail, used: false },
    });

    const otp = generateOTP();
    const token = jwt.sign(
      { email: normalizedEmail, purpose: 'password-reset' },
      JWT_SECRET,
      { expiresIn: '10m' }
    );

    const expires = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.passwordReset.create({
      data: {
        email: normalizedEmail,
        otp,
        token,
        expires,
      },
    });

    await sendOTPEmail(normalizedEmail, otp);

    const ip = request.headers.get('x-forwarded-for') || 'Unknown';

    await prisma.notification.create({
      data: {
        type: 'security',
        title: 'Password Reset Requested',
        message: `A verification code was sent to "${normalizedEmail}" from IP: ${ip}. If this was not you, secure your account immediately.`,
      },
    });

    return NextResponse.json({
      message: 'If an account exists with this email, a verification code has been sent.',
      token,
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
