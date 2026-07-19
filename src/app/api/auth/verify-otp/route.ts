import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
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

    const payload = await request.json().catch(() => null);
    const token = typeof payload?.token === 'string' ? payload.token : '';
    const otp = typeof payload?.otp === 'string' ? payload.otp : '';

    if (!token || !otp) {
      return NextResponse.json({ error: 'Token and verification code are required' }, { status: 400 });
    }

    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json({ error: 'Verification code must be exactly 6 digits' }, { status: 400 });
    }

    let decoded: { email: string; purpose: string };
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { email: string; purpose: string };
    } catch {
      return NextResponse.json({ error: 'Invalid or expired session. Please request a new code.' }, { status: 400 });
    }

    if (decoded.purpose !== 'password-reset') {
      return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
    }

    const reset = await prisma.passwordReset.findFirst({
      where: {
        email: decoded.email,
        token,
        used: false,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!reset) {
      return NextResponse.json({ error: 'Invalid verification code. Please try again.' }, { status: 400 });
    }

    if (new Date() > reset.expires) {
      await prisma.passwordReset.update({
        where: { id: reset.id },
        data: { used: true },
      });
      return NextResponse.json({ error: 'This code has expired. Please request a new one.' }, { status: 400 });
    }

    if (reset.attempts >= reset.maxAttempts) {
      return NextResponse.json({ error: 'Too many attempts. Please request a new code.', attemptsRemaining: 0 }, { status: 429 });
    }

    const updatedReset = await prisma.passwordReset.update({
      where: { id: reset.id },
      data: { attempts: reset.attempts + 1 },
    });

    if (reset.otp !== otp) {
      const remaining = reset.maxAttempts - updatedReset.attempts;
      if (remaining <= 0) {
        return NextResponse.json({ error: 'Too many attempts. Please request a new code.', attemptsRemaining: 0 }, { status: 429 });
      }
      return NextResponse.json({ error: `Invalid verification code. ${remaining} attempt(s) remaining.`, attemptsRemaining: remaining }, { status: 400 });
    }

    const resetToken = jwt.sign(
      { email: decoded.email, purpose: 'reset-verified', resetId: reset.id },
      JWT_SECRET,
      { expiresIn: '5m' }
    );

    await prisma.passwordReset.update({
      where: { id: reset.id },
      data: { verified: true },
    });

    try {
      await prisma.notification.create({
        data: {
          type: 'security',
          title: 'OTP Verified',
          message: `The verification code for "${decoded.email}" was verified successfully.`,
        },
      });
    } catch (error) {
      console.error('Failed to create notification:', error);
    }

    return NextResponse.json({ message: 'Verification successful', resetToken });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
