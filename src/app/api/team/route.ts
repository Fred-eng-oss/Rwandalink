import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const team = await prisma.teamMember.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(team);
  } catch (error) {
    console.error('Error fetching team:', error);
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const member = await prisma.teamMember.create({
      data: {
        name: body.name,
        role: body.role,
        bio: body.bio || null,
        image: body.image || null,
        email: body.email || null,
        phone: body.phone || null,
        linkedin: body.linkedin || null,
        twitter: body.twitter || null,
        order: body.order ?? 0,
        isActive: body.isActive ?? true,
      },
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}
