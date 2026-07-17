import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const serviceRequest = await prisma.serviceRequest.update({
      where: { id },
      data: {
        fullName: body.fullName,
        companyName: body.companyName,
        email: body.email,
        phone: body.phone,
        serviceId: body.serviceId,
        projectDescription: body.projectDescription,
        budget: body.budget,
        preferredDate: body.preferredDate,
        status: body.status,
      },
    });

    return NextResponse.json(serviceRequest);
  } catch (error) {
    console.error('Error updating service request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.serviceRequest.delete({ where: { id } });

    return NextResponse.json({ message: 'Service request deleted successfully' });
  } catch (error) {
    console.error('Error deleting service request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
