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

    const email = payload.email;

    const lastReset = await prisma.passwordReset.findFirst({
      where: { email },
      orderBy: { createdAt: 'desc' },
    });

    if (lastReset && Date.now() - new Date(lastReset.createdAt).getTime() < 60000) {
      return NextResponse.json(
        { error: 'Please wait at least 60 seconds before requesting another code.' },
        { status: 429 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    // Unregistered email: return same success response, no DB record, no email
    // Verify-otp will return "Invalid code" which is indistinguishable from wrong OTP
    if (!user) {
      const newToken = jwt.sign(
        { email, purpose: 'password-reset' },
        JWT_SECRET,
        { expiresIn: '10m' }
      );
      return NextResponse.json({
        message: 'A new verification code has been sent.',
        token: newToken,
        expiresAt: expires.toISOString(),
      });
    }

    // Registered user: delete old codes, create new one
    await prisma.passwordReset.deleteMany({
      where: { email, used: false },
    });

    const otp = generateOTP();
    const newToken = jwt.sign(
      { email, purpose: 'password-reset' },
      JWT_SECRET,
      { expiresIn: '10m' }
    );

    await prisma.passwordReset.create({
      data: {
        email,
        otp,
        token: newToken,
        expires,
      },
    });

    await sendOTPEmail(email, otp);

    return NextResponse.json({
      message: 'A new verification code has been sent.',
      token: newToken,
      expiresAt: expires.toISOString(),
    });
  } catch (error) {
    console.error('Resend OTP error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
