import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetail from "@/components/services/service-detail";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getService(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/services/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return { title: "Service Not Found | SmartLink Rwanda" };
  }

  return {
    title: `${service.title} | SmartLink Rwanda`,
    description:
      service.description?.substring(0, 160) || service.title,
    openGraph: {
      title: `${service.title} | SmartLink Rwanda`,
      description: service.description?.substring(0, 160) || service.title,
      url: `https://smartlink.rw/services/${slug}`,
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

function parseProcessJson(value: unknown): { step: number; title: string; desc: string }[] {
  if (!value) return [];
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return value
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((line, i) => ({ step: i + 1, title: line, desc: "" }));
    }
  }
  return [];
}

function parseFeaturesListJson(value: unknown): { title: string; desc: string }[] {
  if (!value) return [];
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return value
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((line) => ({ title: line, desc: "" }));
    }
  }
  return [];
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const raw = await getService(slug);

  if (!raw) {
    notFound();
  }

  const features = parseJsonArray(raw.features);
  const benefits = parseJsonArray(raw.benefits);
  const process = parseProcessJson(raw.process);
  const featuresList = parseFeaturesListJson(raw.featuresList || raw.content);

  const service = {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    shortDescription:
      raw.description?.substring(0, 150) + (raw.description?.length > 150 ? "..." : "") ||
      raw.title,
    description: raw.description || "",
    icon: raw.icon || "globe",
    image: raw.image || null,
    features,
    benefits,
    process: process.length > 0 ? process : [
      { step: 1, title: "Consultation", desc: "We assess your needs and provide a tailored solution." },
      { step: 2, title: "Planning", desc: "We create a detailed plan aligned with your goals." },
      { step: 3, title: "Execution", desc: "Our team delivers the solution with precision." },
      { step: 4, title: "Support", desc: "We provide ongoing support and maintenance." },
    ],
    featuresList: featuresList.length > 0 ? featuresList : features.map((f) => ({
      title: f,
      desc: `${f} included in this service`,
    })),
  };

  return <ServiceDetail service={service} />;
}
