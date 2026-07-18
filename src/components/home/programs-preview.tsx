"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight, Image as ImageIcon } from "lucide-react";

interface Program {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  image: string | null;
  isActive: boolean;
}

const gradients = [
  "from-blue-700 to-blue-900",
  "from-emerald-700 to-emerald-900",
  "from-red-700 to-red-900",
  "from-purple-700 to-purple-900",
  "from-orange-600 to-red-700",
  "from-teal-700 to-blue-800",
  "from-indigo-700 to-indigo-900",
];

export default function ProgramsPreview() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetch("/api/programs")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data.filter((p: Program) => p.isActive) : [];
        setPrograms(list.slice(0, 6));
      })
      .catch(() => {});
  }, []);

  if (programs.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.03]"
        style={{ backgroundImage: "url('/images/DSC_0088.JPG.jpeg')" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-800 text-sm font-semibold rounded-full mb-4">
            Training Programs
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Advance Your <span className="text-emerald-600">IT Career</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Industry-relevant training programs designed to equip you with
            practical skills and recognized certifications.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${gradients[index % gradients.length]}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              {program.image && (
                <div className="relative h-48">
                  <img src={program.image} alt={program.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
              )}

              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                />
              </div>

              <div className="relative p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{program.duration}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-white">{program.title}</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-6 line-clamp-2">
                  {program.description}
                </p>

                <Link
                  href={`/programs/${program.slug}`}
                  className="group/link inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-2.5 rounded-lg font-medium text-sm text-white transition-all duration-300"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/programs"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50"
          >
            View All Programs
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
