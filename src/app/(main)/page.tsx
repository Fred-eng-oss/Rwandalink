import type { Metadata } from "next";
import dynamic from "next/dynamic";

const HeroSection = dynamic(() => import("@/components/home/hero-section"));
const AboutPreview = dynamic(() => import("@/components/home/about-preview"));
const WhyChooseUs = dynamic(() => import("@/components/home/why-choose-us"));
const ServicesPreview = dynamic(() => import("@/components/home/services-preview"));
const ProgramsPreview = dynamic(() => import("@/components/home/programs-preview"));
const StatsSection = dynamic(() => import("@/components/home/stats-section"));
const TestimonialsSection = dynamic(() => import("@/components/home/testimonials-section"));
const NewsPreview = dynamic(() => import("@/components/home/news-preview"));
const PartnersSection = dynamic(() => import("@/components/home/partners-section"));
const CtaSection = dynamic(() => import("@/components/home/cta-section"));
const ContactPreview = dynamic(() => import("@/components/home/contact-preview"));

export const metadata: Metadata = {
  title: "SmartLink Rwanda - Empowering Rwanda's Digital Future",
  description:
    "SmartLink Rwanda is a leading ICT company bridging the technology gap in Rwanda's digital economy through professional IT services, training, certifications, and consultancy.",
  keywords: [
    "ICT Rwanda",
    "IT services Kigali",
    "computer training Rwanda",
    "web design Rwanda",
    "IT consulting Rwanda",
    "networking training",
    "SmartLink Rwanda",
  ],
  openGraph: {
    title: "SmartLink Rwanda - Empowering Rwanda's Digital Future",
    description:
      "Professional IT services, training, certifications, and consultancy bridging Rwanda's technology gap.",
    url: "https://smartlinkrwanda.com",
    siteName: "SmartLink Rwanda",
    locale: "en_RW",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutPreview />
      <WhyChooseUs />
      <ServicesPreview />
      <ProgramsPreview />
      <StatsSection />
      <TestimonialsSection />
      <NewsPreview />
      <PartnersSection />
      <CtaSection />
      <ContactPreview />
    </main>
  );
}
