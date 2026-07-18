import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/password';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ error: 'Token and password are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const reset = await prisma.passwordReset.findUnique({ where: { token } });

    if (!reset || reset.used || new Date() > reset.expires) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    const hashedPassword = hashPassword(password);

    await prisma.user.update({
      where: { email: reset.email },
      data: { password: hashedPassword },
    });

    await prisma.passwordReset.update({
      where: { id: reset.id },
      data: { used: true },
    });

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown';

    await prisma.notification.create({
      data: {
        type: 'security',
        title: 'Password Changed Successfully',
        message: `The password for account "${reset.email}" was successfully changed from IP: ${ip}. If this was not you, contact support immediately.`,
      },
    });

    return NextResponse.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
