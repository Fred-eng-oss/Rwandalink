"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Server,
  HardDrive,
  Mail,
  Wrench,
  Briefcase,
  ShoppingBag,
  ArrowRight,
  Image as ImageIcon,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Globe, Server, HardDrive, Mail, Wrench, Briefcase, ShoppingBag,
};

const colors = [
  "from-blue-600 to-blue-800",
  "from-emerald-600 to-emerald-800",
  "from-purple-600 to-purple-800",
  "from-amber-500 to-orange-600",
  "from-red-500 to-red-700",
  "from-teal-600 to-teal-800",
  "from-indigo-600 to-indigo-800",
];

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string | null;
  image: string | null;
  isActive: boolean;
}

export default function ServicesPreview() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data.filter((s: Service) => s.isActive) : [];
        setServices(list.slice(0, 7));
      })
      .catch(() => {});
  }, []);

  if (services.length === 0) return null;

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.03]"
        style={{ backgroundImage: "url('/images/DSC_0087.JPG.jpeg')" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Professional <span className="text-blue-800">IT Services</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Comprehensive technology solutions designed to help your business
            succeed in the digital world.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComp = iconMap[service.icon || ""] || Globe;
            return (
              <motion.div
                key={service.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                {service.image ? (
                  <div className="relative h-32">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <IconComp className="w-12 h-12 text-white drop-shadow-lg" />
                    </div>
                  </div>
                ) : (
                  <div className={`h-32 bg-gradient-to-br ${colors[index % colors.length]} flex items-center justify-center relative overflow-hidden`}>
                    <motion.div className="relative z-10" whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                      <IconComp className="w-12 h-12 text-white" />
                    </motion.div>
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
                    <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full" />
                  </div>
                )}

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-800 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 text-blue-800 font-medium text-sm hover:text-blue-900 transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-blue-800/30 hover:shadow-blue-800/50"
          >
            View All Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
