import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/password';
import { validatePasswordRequirements } from '@/lib/password-reset';
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
    const resetToken = typeof payload?.resetToken === 'string' ? payload.resetToken : '';
    const password = typeof payload?.password === 'string' ? payload.password : '';

    if (!resetToken || !password) {
      return NextResponse.json({ error: 'Reset token and password are required' }, { status: 400 });
    }

    const passwordValidation = validatePasswordRequirements(password);
    if (!passwordValidation.valid) {
      return NextResponse.json({ error: passwordValidation.errors[0] }, { status: 400 });
    }

    let decoded: { email: string; purpose: string; resetId: string };
    try {
      decoded = jwt.verify(resetToken, JWT_SECRET) as { email: string; purpose: string; resetId: string };
    } catch {
      return NextResponse.json({ error: 'Invalid or expired reset session. Please start over.' }, { status: 400 });
    }

    if (decoded.purpose !== 'reset-verified') {
      return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
    }

    const reset = await prisma.passwordReset.findUnique({
      where: { id: decoded.resetId },
    });

    if (!reset || !reset.verified || reset.used) {
      return NextResponse.json({ error: 'This reset session is no longer valid. Please start over.' }, { status: 400 });
    }

    if (new Date() > reset.expires) {
      return NextResponse.json({ error: 'This reset session has expired. Please start over.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found. Please start over.' }, { status: 400 });
    }

    const hashedPassword = hashPassword(password);

    await prisma.user.update({
      where: { email: decoded.email },
      data: { password: hashedPassword },
    });

    await prisma.passwordReset.deleteMany({
      where: { email: decoded.email },
    });

    try {
      const ip = request.headers.get('x-forwarded-for') || 'Unknown';
      await prisma.notification.create({
        data: {
          type: 'security',
          title: 'Password Changed Successfully',
          message: `The password for "${decoded.email}" was changed from IP: ${ip}. If this was not you, contact support immediately.`,
        },
      });
    } catch (error) {
      console.error('Failed to create notification:', error);
    }

    return NextResponse.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
