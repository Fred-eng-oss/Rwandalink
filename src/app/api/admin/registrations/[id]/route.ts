import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const registration = await prisma.registration.update({
      where: { id },
      data: {
        fullName: body.fullName,
        gender: body.gender,
        dateOfBirth: body.dateOfBirth,
        email: body.email,
        phoneNumber: body.phoneNumber,
        address: body.address,
        programId: body.programId,
        passportPhoto: body.passportPhoto,
        status: body.status,
      },
    });

    return NextResponse.json(registration);
  } catch (error) {
    console.error('Error updating registration:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.registration.delete({ where: { id } });

    return NextResponse.json({ message: 'Registration deleted successfully' });
  } catch (error) {
    console.error('Error deleting registration:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
