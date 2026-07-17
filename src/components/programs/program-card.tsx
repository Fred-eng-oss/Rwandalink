"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Code2,
  Network,
  Cpu,
  Palette,
  Monitor,
  Clock,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  code: Code2,
  network: Network,
  cpu: Cpu,
  palette: Palette,
  monitor: Monitor,
};

interface ProgramCardProps {
  program: {
    id: string;
    slug: string;
    title: string;
    shortDescription: string;
    duration: string;
    level: string;
    icon: string;
    highlights: string[];
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

export default function ProgramCard({ program }: ProgramCardProps) {
  const Icon = iconMap[program.icon] || Code2;

  return (
    <motion.div variants={cardVariants} className="group h-full">
      <Link href={`/programs/${program.slug}`} className="block h-full">
        <div className="relative bg-white rounded-2xl border border-gray-100 p-8 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 transition-colors duration-300">
                <Icon className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                <Clock className="w-4 h-4" />
                <span>{program.duration}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
              {program.title}
            </h3>

            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full mb-3">
              {program.level}
            </div>

            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
              {program.shortDescription}
            </p>

            <div className="space-y-2 mb-6">
              {program.highlights.slice(0, 3).map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center text-emerald-700 font-medium text-sm group-hover:gap-3 gap-2 transition-all duration-300">
              <span>View program details</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
