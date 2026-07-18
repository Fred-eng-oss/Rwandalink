import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'No account found with this email' }, { status: 404 });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.passwordReset.deleteMany({ where: { email, used: false } });

    await prisma.passwordReset.create({
      data: { email, token, expires },
    });

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown';
    const userAgent = request.headers.get('user-agent') || 'Unknown';

    await prisma.notification.create({
      data: {
        type: 'security',
        title: 'Password Reset Requested',
        message: `A password reset was requested for account "${email}" from IP: ${ip}. Browser: ${userAgent.substring(0, 100)}. If this was not you, please secure your account immediately.`,
      },
    });

    return NextResponse.json({
      message: 'Password reset token generated',
      token,
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
