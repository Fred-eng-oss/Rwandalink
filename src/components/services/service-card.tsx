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
  ArrowRight,
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

interface ServiceCardProps {
  service: {
    id: string;
    slug: string;
    title: string;
    shortDescription: string;
    icon: string;
    features: string[];
  };
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Globe;

  return (
    <motion.div variants={cardVariants} className="group h-full">
      <Link href={`/services/${service.slug}`} className="block h-full">
        <div className="relative bg-white rounded-2xl border border-gray-100 p-8 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-800/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

          <div className="relative">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-800 transition-colors duration-300">
              <Icon className="w-7 h-7 text-blue-800 group-hover:text-white transition-colors duration-300" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-800 transition-colors">
              {service.title}
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
              {service.shortDescription}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {service.features.map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full border border-gray-100"
                >
                  {feature}
                </span>
              ))}
            </div>

            <div className="flex items-center text-blue-800 font-medium text-sm group-hover:gap-3 gap-2 transition-all duration-300">
              <span>Learn more</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
