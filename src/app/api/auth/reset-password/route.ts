import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/password';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'smartlink-secret-key';

export async function POST(request: NextRequest) {
  try {
    // 1. CSRF protection: check Origin and Host
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

    const { resetToken, password } = await request.json();

    if (!resetToken || !password) {
      return NextResponse.json({ error: 'Reset token and password are required' }, { status: 400 });
    }

    // Password requirements:
    // - Minimum 8 characters
    // - One uppercase letter
    // - One lowercase letter
    // - One number
    // - One special character
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    if (!/[A-Z]/.test(password)) {
      return NextResponse.json({ error: 'Password must contain at least one uppercase letter' }, { status: 400 });
    }

    if (!/[a-z]/.test(password)) {
      return NextResponse.json({ error: 'Password must contain at least one lowercase letter' }, { status: 400 });
    }

    if (!/[0-9]/.test(password)) {
      return NextResponse.json({ error: 'Password must contain at least one number' }, { status: 400 });
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password)) {
      return NextResponse.json({ error: 'Password must contain at least one special character' }, { status: 400 });
    }

    let payload: { email: string; purpose: string; resetId: string };
    try {
      payload = jwt.verify(resetToken, JWT_SECRET) as { email: string; purpose: string; resetId: string };
    } catch {
      return NextResponse.json({ error: 'Invalid or expired reset session. Please start over.' }, { status: 400 });
    }

    if (payload.purpose !== 'reset-verified') {
      return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
    }

    // Retrieve active reset record
    const reset = await prisma.passwordReset.findUnique({
      where: { id: payload.resetId },
    });

    if (!reset || !reset.verified || reset.used) {
      return NextResponse.json({ error: 'This reset session is no longer valid. Please start over.' }, { status: 400 });
    }

    // Verify user exists (double check)
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found. Please start over.' }, { status: 400 });
    }

    // Securely hash password (will use bcryptjs)
    const hashedPassword = hashPassword(password);

    // Save to database
    await prisma.user.update({
      where: { email: payload.email },
      data: { password: hashedPassword },
    });

    // Invalidate and delete ALL reset records for this user (Delete the OTP after successful reset, Invalidate previous reset tokens)
    await prisma.passwordReset.deleteMany({
      where: { email: payload.email },
    });

    // Log security notification
    try {
      const ip = request.headers.get('x-forwarded-for') || 'Unknown';
      await prisma.notification.create({
        data: {
          type: 'security',
          title: 'Password Changed Successfully',
          message: `The password for "${payload.email}" was changed from IP: ${ip}. If this was not you, contact support immediately.`,
        },
      });
    } catch (e) {
      console.error('Failed to create notification:', e);
    }

    return NextResponse.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
