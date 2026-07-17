import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const result = await prisma.$queryRaw`
      SELECT
        (SELECT COUNT(*) FROM "Service") as services,
        (SELECT COUNT(*) FROM "Program") as programs,
        (SELECT COUNT(*) FROM "Registration") as registrations,
        (SELECT COUNT(*) FROM "ServiceRequest") as "serviceRequests",
        (SELECT COUNT(*) FROM "Message") as messages,
        (SELECT COUNT(*) FROM "News") as news,
        (SELECT COUNT(*) FROM "Student") as students,
        (SELECT COUNT(*) FROM "TeamMember") as "teamMembers",
        (SELECT COUNT(*) FROM "Testimonial") as testimonials
    `;

    const row = Array.isArray(result) ? result[0] : result;

    return NextResponse.json({
      services: Number(row.services) || 0,
      programs: Number(row.programs) || 0,
      registrations: Number(row.registrations) || 0,
      serviceRequests: Number(row.serviceRequests) || 0,
      messages: Number(row.messages) || 0,
      news: Number(row.news) || 0,
      students: Number(row.students) || 0,
      teamMembers: Number(row.teamMembers) || 0,
      testimonials: Number(row.testimonials) || 0,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
