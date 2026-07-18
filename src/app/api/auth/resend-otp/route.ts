import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateOTP, sendOTPEmail } from '@/lib/email';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'smartlink-secret-key';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    let payload: { email: string; purpose: string };
    try {
      payload = jwt.verify(token, JWT_SECRET) as { email: string; purpose: string };
    } catch {
      return NextResponse.json({ error: 'Invalid or expired session. Please start over.' }, { status: 400 });
    }

    if (payload.purpose !== 'password-reset') {
      return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
    }

    await prisma.passwordReset.deleteMany({
      where: { email: payload.email, used: false },
    });

    const otp = generateOTP();
    const newToken = jwt.sign(
      { email: payload.email, purpose: 'password-reset' },
      JWT_SECRET,
      { expiresIn: '10m' }
    );

    const expires = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.passwordReset.create({
      data: {
        email: payload.email,
        otp,
        token: newToken,
        expires,
      },
    });

    await sendOTPEmail(payload.email, otp);

    return NextResponse.json({
      message: 'A new verification code has been sent.',
      token: newToken,
    });
  } catch (error) {
    console.error('Resend OTP error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
