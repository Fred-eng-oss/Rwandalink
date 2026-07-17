import type { Metadata } from "next";
import ServicesClient from "./services-client";

export const metadata: Metadata = {
  title: "Our Services | SmartLink Rwanda",
  description:
    "Explore SmartLink Rwanda's comprehensive technology services including web development, custom software, hosting, IT support, and more.",
  keywords: [
    "web development Rwanda",
    "custom software Rwanda",
    "web hosting Rwanda",
    "IT support Rwanda",
    "computer repair Kigali",
    "business email Rwanda",
    "tech accessories Rwanda",
  ],
  openGraph: {
    title: "Our Services | SmartLink Rwanda",
    description:
      "Comprehensive technology solutions for businesses and individuals in Rwanda.",
    url: "https://smartlink.rw/services",
    siteName: "SmartLink Rwanda",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
