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
    const token = typeof payload?.token === 'string' ? payload.token : '';

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    let decoded: { email: string; purpose: string };
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { email: string; purpose: string };
    } catch {
      return NextResponse.json({ error: 'Invalid or expired session. Please start over.' }, { status: 400 });
    }

    if (decoded.purpose !== 'password-reset') {
      return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
    }

    const email = decoded.email;
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
    const newToken = jwt.sign(
      { email, purpose: 'password-reset' },
      JWT_SECRET,
      { expiresIn: '10m' }
    );

    if (user) {
      await prisma.passwordReset.deleteMany({ where: { email, used: false } });
      await prisma.passwordReset.create({
        data: {
          email,
          otp,
          token: newToken,
          expires,
          attempts: 0,
          maxAttempts: 5,
          verified: false,
          used: false,
        },
      });
      void sendOTPEmail(email, otp).catch((emailError) => {
        console.error('Failed to send resend OTP email:', emailError);
      });
    }

    const responsePayload: Record<string, unknown> = {
      message: 'A new verification code has been sent.',
      token: newToken,
      expiresAt: expires.toISOString(),
    };

    if (exposeOtpInDevelopment) {
      responsePayload.otp = otp;
    }

    return NextResponse.json(responsePayload);
  } catch (error) {
    console.error('Resend OTP error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
