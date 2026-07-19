import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateOTP, sendOTPEmail } from '@/lib/email';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'smartlink-secret-key';
const OTP_WINDOW_MS = 10 * 1000;
const OTP_TTL_MS = 10 * 60 * 1000;
const exposeOtpInDevelopment = process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_SHOW_RESET_OTP === 'true';

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
    const email = typeof payload?.email === 'string' ? payload.email.trim().toLowerCase() : '';

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    const lastReset = await prisma.passwordReset.findFirst({
      where: { email },
      orderBy: { createdAt: 'desc' },
    });

    if (lastReset && Date.now() - new Date(lastReset.createdAt).getTime() < OTP_WINDOW_MS) {
      return NextResponse.json(
        { error: 'Please wait at least 60 seconds before requesting another code.' },
        { status: 429 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    const expires = new Date(Date.now() + OTP_TTL_MS);
    const otp = generateOTP();
    const token = jwt.sign(
      { email, purpose: 'password-reset' },
      JWT_SECRET,
      { expiresIn: '10m' }
    );

    if (user) {
      await prisma.passwordReset.deleteMany({
        where: { email, used: false },
      });

      await prisma.passwordReset.create({
        data: {
          email,
          otp,
          token,
          expires,
          attempts: 0,
          maxAttempts: 5,
          verified: false,
          used: false,
        },
      });

      void sendOTPEmail(email, otp).catch((emailError) => {
        console.error('Failed to send OTP email:', emailError);
      });
    }

    try {
      const ip = request.headers.get('x-forwarded-for') || 'Unknown';
      await prisma.notification.create({
        data: {
          type: 'security',
          title: 'Password Reset Requested',
          message: `A verification code was sent to "${email}" from IP: ${ip}. If this was not you, secure your account immediately.`,
        },
      });
    } catch (error) {
      console.error('Failed to create notification:', error);
    }

    const responsePayload: Record<string, unknown> = {
      message: 'A verification code has been sent to your email.',
      token,
      expiresAt: expires.toISOString(),
    };

    if (exposeOtpInDevelopment) {
      responsePayload.otp = otp;
    }

    return NextResponse.json(responsePayload);
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
