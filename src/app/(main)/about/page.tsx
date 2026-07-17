import type { Metadata } from "next";
import CompanyOverview from "@/components/about/company-overview";
import MissionVision from "@/components/about/mission-vision";
import CoreValues from "@/components/about/core-values";
import TeamSection from "@/components/about/team-section";
import WhyChooseUs from "@/components/about/why-choose-us";
import CompanyHistory from "@/components/about/company-history";

export const metadata: Metadata = {
  title: "About Us | SmartLink Rwanda",
  description:
    "Learn about SmartLink Rwanda - Rwanda's leading ICT company bridging the technology gap in the digital economy. Discover our mission, vision, core values, and journey.",
  keywords: [
    "SmartLink Rwanda",
    "ICT company Rwanda",
    "technology solutions Rwanda",
    "digital transformation",
    "Rwanda IT company",
  ],
  openGraph: {
    title: "About Us | SmartLink Rwanda",
    description:
      "Learn about SmartLink Rwanda - Rwanda's leading ICT company bridging the technology gap in the digital economy.",
    url: "https://smartlink.rw/about",
    siteName: "SmartLink Rwanda",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <CompanyOverview />
      <MissionVision />
      <CoreValues />
      <CompanyHistory />
      <TeamSection />
      <WhyChooseUs />
    </main>
  );
}
