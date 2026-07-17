import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const serviceRequests = await prisma.serviceRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(serviceRequests);
  } catch (error) {
    console.error('Error fetching service requests:', error);
    return NextResponse.json({ error: 'Failed to fetch service requests' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        fullName: body.fullName,
        companyName: body.companyName || null,
        email: body.email,
        phone: body.phone,
        serviceId: body.serviceId,
        projectDescription: body.projectDescription,
        budget: body.budget || null,
        preferredDate: body.preferredDate ? new Date(body.preferredDate) : null,
      },
    });

    return NextResponse.json(serviceRequest, { status: 201 });
  } catch (error) {
    console.error('Error creating service request:', error);
    return NextResponse.json({ error: 'Failed to create service request' }, { status: 500 });
  }
}
