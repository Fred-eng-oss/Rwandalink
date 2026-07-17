import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const registration = await prisma.registration.create({
      data: {
        fullName: body.fullName,
        gender: body.gender,
        dateOfBirth: new Date(body.dateOfBirth),
        email: body.email,
        phoneNumber: body.phoneNumber,
        address: body.address,
        programId: body.programId,
        passportPhoto: body.passportPhoto || null,
      },
    });

    return NextResponse.json(registration, { status: 201 });
  } catch (error) {
    console.error('Error creating registration:', error);
    return NextResponse.json({ error: 'Failed to create registration' }, { status: 500 });
  }
}
