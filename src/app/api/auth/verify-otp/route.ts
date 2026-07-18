import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'smartlink-secret-key';

export async function POST(request: NextRequest) {
  try {
    const { token, otp } = await request.json();

    if (!token || !otp) {
      return NextResponse.json({ error: 'Token and verification code are required' }, { status: 400 });
    }

    let payload: { email: string; purpose: string };
    try {
      payload = jwt.verify(token, JWT_SECRET) as { email: string; purpose: string };
    } catch {
      return NextResponse.json({ error: 'Invalid or expired session. Please request a new code.' }, { status: 400 });
    }

    if (payload.purpose !== 'password-reset') {
      return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
    }

    const reset = await prisma.passwordReset.findFirst({
      where: {
        email: payload.email,
        token,
        used: false,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!reset) {
      return NextResponse.json({ error: 'No pending reset found. Please request a new code.' }, { status: 400 });
    }

    if (new Date() > reset.expires) {
      return NextResponse.json({ error: 'This code has expired. Please request a new one.' }, { status: 400 });
    }

    if (reset.attempts >= reset.maxAttempts) {
      return NextResponse.json({ error: 'Too many attempts. Please request a new code.' }, { status: 429 });
    }

    await prisma.passwordReset.update({
      where: { id: reset.id },
      data: { attempts: reset.attempts + 1 },
    });

    if (reset.otp !== otp) {
      const remaining = reset.maxAttempts - (reset.attempts + 1);
      return NextResponse.json({
        error: `Invalid verification code. ${remaining} attempt(s) remaining.`,
        attemptsRemaining: remaining,
      }, { status: 400 });
    }

    const resetToken = jwt.sign(
      { email: payload.email, purpose: 'reset-verified', resetId: reset.id },
      JWT_SECRET,
      { expiresIn: '5m' }
    );

    await prisma.passwordReset.update({
      where: { id: reset.id },
      data: { verified: true },
    });

    await prisma.notification.create({
      data: {
        type: 'security',
        title: 'OTP Verified',
        message: `The verification code for "${payload.email}" was verified successfully. Waiting for password change.`,
      },
    });

    return NextResponse.json({
      message: 'Verification successful',
      resetToken,
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
