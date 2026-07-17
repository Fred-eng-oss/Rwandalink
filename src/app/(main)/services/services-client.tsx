"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ServiceCard from "@/components/services/service-card";

interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string | null;
  features: string | null;
  image: string | null;
  isActive: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

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

export default function ServicesClient() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data)
          ? data.filter((s: Service) => s.isActive)
          : [];
        setServices(list);
      })
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 pt-32 pb-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <nav className="flex items-center justify-center gap-2 text-blue-200 text-sm mb-8">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-white">Services</span>
            </nav>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400">
                Services
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Comprehensive technology solutions designed to empower your
              business and drive growth in the digital economy.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.length === 0 ? (
            <p className="text-center text-gray-500 py-12">Loading services...</p>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={{
                    id: service.id,
                    slug: service.slug,
                    title: service.title,
                    shortDescription: service.description?.substring(0, 150) + (service.description?.length > 150 ? "..." : "") || service.title,
                    icon: service.icon || "globe",
                    features: parseJsonArray(service.features),
                  }}
                />
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-3xl p-10 md:p-14 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-blue-100 max-w-2xl mx-auto mb-8">
                Don&apos;t see exactly what you need? We specialize in creating
                tailored solutions. Let&apos;s discuss your unique requirements.
              </p>
              <Link
                href="/service-request"
                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/25"
              >
                Request Custom Service
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
