"use client";

import { Toaster } from "react-hot-toast";
import { BackToTop } from "@/components/ui/back-to-top";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster position="top-right" />
      <BackToTop />
    </>
  );
}
