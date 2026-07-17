import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramDetail from "@/components/programs/program-detail";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getProgram(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/programs/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgram(slug);

  if (!program) {
    return { title: "Program Not Found | SmartLink Rwanda" };
  }

  return {
    title: `${program.title} Training | SmartLink Rwanda`,
    description:
      program.description?.substring(0, 160) ||
      `${program.title} training program at SmartLink Rwanda`,
    openGraph: {
      title: `${program.title} Training | SmartLink Rwanda`,
      description:
        program.description?.substring(0, 160) || program.title,
      url: `https://smartlink.rw/programs/${slug}`,
      siteName: "SmartLink Rwanda",
      type: "website",
    },
  };
}

function parseJsonArray(value: unknown): string[] {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string" || !value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return value
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  }
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const raw = await getProgram(slug);

  if (!raw) {
    notFound();
  }

  const program = {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    shortDescription:
      raw.description?.substring(0, 150) + (raw.description?.length > 150 ? "..." : "") ||
      raw.title,
    description: raw.description || "",
    duration: raw.duration || "",
    level: raw.level || "All Levels",
    icon: raw.icon || "code",
    image: raw.image || null,
    highlights: parseJsonArray(raw.highlights),
    requirements: parseJsonArray(raw.requirements),
    outcomes: parseJsonArray(raw.learningOutcomes),
    modules: parseJsonArray(raw.modules),
  };

  return <ProgramDetail program={program} />;
}
