import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: NextRequest) {
  try {
    const { settings } = await request.json();

    if (!Array.isArray(settings) || settings.length === 0) {
      return NextResponse.json({ error: 'Settings array is required' }, { status: 400 });
    }

    const updates = settings.map((item: { key: string; value: string }) =>
      prisma.setting.upsert({
        where: { key: item.key },
        update: { value: item.value },
        create: { key: item.key, value: item.value },
      })
    );

    const results = await Promise.all(updates);

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
