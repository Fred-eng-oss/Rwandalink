import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateOTP, sendOTPEmail } from '@/lib/email';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'smartlink-secret-key';

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    if (origin && host) {
      try {
        const originUrl = new URL(origin);
        if (originUrl.host !== host) {
          return NextResponse.json({ error: 'CSRF verification failed' }, { status: 403 });
        }
      } catch {
        return NextResponse.json({ error: 'Invalid origin header' }, { status: 403 });
      }
    }

    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const lastReset = await prisma.passwordReset.findFirst({
      where: { email: normalizedEmail },
      orderBy: { createdAt: 'desc' },
    });

    if (lastReset && Date.now() - new Date(lastReset.createdAt).getTime() < 60000) {
      return NextResponse.json(
        { error: 'Please wait at least 60 seconds before requesting another code.' },
        { status: 429 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    // Unregistered email: return same success response without leaking existence
    if (!user) {
      const token = jwt.sign(
        { email: normalizedEmail, purpose: 'password-reset' },
        JWT_SECRET,
        { expiresIn: '10m' }
      );
      return NextResponse.json({
        message: 'A verification code has been sent to your email.',
        token,
        expiresAt: expires.toISOString(),
      });
    }

    // Registered user: clean up old codes, generate new OTP
    await prisma.passwordReset.deleteMany({
      where: { email: normalizedEmail, used: false },
    });

    const otp = generateOTP();
    const token = jwt.sign(
      { email: normalizedEmail, purpose: 'password-reset' },
      JWT_SECRET,
      { expiresIn: '10m' }
    );

    await prisma.passwordReset.create({
      data: {
        email: normalizedEmail,
        otp,
        token,
        expires,
      },
    });

    await sendOTPEmail(normalizedEmail, otp);

    try {
      const ip = request.headers.get('x-forwarded-for') || 'Unknown';
      await prisma.notification.create({
        data: {
          type: 'security',
          title: 'Password Reset Requested',
          message: `A verification code was sent to "${normalizedEmail}" from IP: ${ip}. If this was not you, secure your account immediately.`,
        },
      });
    } catch (e) {
      console.error('Failed to create notification:', e);
    }

    return NextResponse.json({
      message: 'A verification code has been sent to your email.',
      token,
      expiresAt: expires.toISOString(),
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
