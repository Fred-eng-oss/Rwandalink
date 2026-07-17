"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Program {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  image: string | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ProgramsOverview() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetch("/api/programs")
      .then((r) => r.json())
      .then((d) => setPrograms(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, []);

  if (programs.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
            Our Programs
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Training & Certification Programs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a wide range of professional IT training programs designed
            to equip you with the skills needed in today&apos;s digital economy.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {programs.map((program) => (
            <motion.div
              key={program.id}
              variants={cardVariants}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                <div className="h-48 bg-gradient-to-br from-blue-700 to-blue-900 relative overflow-hidden">
                  {program.image ? (
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-white/20" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                      <Clock className="w-3 h-3" />
                      {program.duration}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-800 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    {program.description.length > 120
                      ? program.description.substring(0, 120) + "..."
                      : program.description}
                  </p>
                  <Link
                    href={`/programs/${program.slug}`}
                    className="inline-flex items-center gap-1 text-blue-800 font-medium text-sm mt-4 hover:gap-2 transition-all"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-800 text-white rounded-xl font-medium hover:bg-blue-900 transition-colors"
          >
            View All Programs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
