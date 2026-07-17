"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Code2,
  Server,
  Mail,
  Wrench,
  Headphones,
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  globe: Globe,
  code: Code2,
  server: Server,
  mail: Mail,
  wrench: Wrench,
  headphones: Headphones,
  "shopping-bag": ShoppingBag,
};

interface ServiceDetailProps {
  service: {
    id: string;
    slug: string;
    title: string;
    shortDescription: string;
    description: string;
    icon?: string;
    image?: string | null;
    features?: string[];
    benefits?: string[];
    process?: { step: number; title: string; desc: string }[];
    featuresList?: { title: string; desc: string }[];
  };
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  const Icon = iconMap[service.icon || ""] || Globe;
  const features = service.features || [];
  const benefits = service.benefits || [];
  const process = service.process || [];
  const featuresList = service.featuresList || [];

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
          >
            <nav className="flex items-center gap-2 text-blue-200 text-sm mb-8 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                href="/services"
                className="hover:text-white transition-colors"
              >
                Services
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{service.title}</span>
            </nav>

            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center">
                <Icon className="w-8 h-8 text-emerald-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {service.title}
              </h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl leading-relaxed">
              {service.shortDescription}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Overview
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                {service.description}
              </p>

                <div className="bg-gray-50 rounded-2xl p-8 mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Key Benefits
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {benefits.length > 0 ? benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  )) : (
                    <p className="text-gray-500 col-span-2">Contact us for more details about this service.</p>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="sticky top-24 space-y-6">
                <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-4">Get Started</h3>
                  <p className="text-blue-100 text-sm mb-6">
                    Ready to get started with {service.title}? Contact us today
                    for a free consultation.
                  </p>
                  <Link
                    href="/service-request"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
                  >
                    Request Service
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Features
                  </h4>
                  <div className="space-y-3">
                    {features.length > 0 ? features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-800 rounded-full" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    )) : (
                      <p className="text-gray-500 text-sm">Contact us for details</p>
                    )}
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Need Help?
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Not sure which service is right for you? Our team is here to
                    help.
                  </p>
                  <Link
                    href="/contact"
                    className="text-blue-800 text-sm font-medium hover:underline"
                  >
                    Contact Us →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We follow a proven methodology to ensure every project is delivered
              on time, within budget, and to the highest quality standards.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-blue-800 text-white rounded-xl flex items-center justify-center text-lg font-bold mb-5">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What&apos;s Included
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need for a complete and successful {service.title.toLowerCase()} experience.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresList.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group"
              >
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-800 transition-colors duration-300">
                    <CheckCircle2 className="w-5 h-5 text-blue-800 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              Let SmartLink Rwanda help you achieve your technology goals.
              Contact us today for a free consultation and quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/service-request"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/25"
              >
                Request This Service
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-colors"
              >
                Talk to an Expert
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
