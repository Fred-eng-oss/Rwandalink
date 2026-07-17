import type { Metadata } from "next";
import ProgramsClient from "./programs-client";

export const metadata: Metadata = {
  title: "Training Programs | SmartLink Rwanda",
  description:
    "Explore SmartLink Rwanda's professional internship programs including Software Development, Networking, Computer Systems, Electrical Technology, Electronics & Telecommunication, Accounting, and IoT & Robotics.",
  keywords: [
    "IT training Rwanda",
    "software development course Kigali",
    "networking training Rwanda",
    "electrical technology course Rwanda",
    "accounting course Rwanda",
    "IoT robotics Rwanda",
  ],
  openGraph: {
    title: "Training Programs | SmartLink Rwanda",
    description:
      "Professional IT training programs to build Rwanda's digital workforce.",
    url: "https://smartlink.rw/programs",
    siteName: "SmartLink Rwanda",
    type: "website",
  },
};

export default function ProgramsPage() {
  return <ProgramsClient />;
}
