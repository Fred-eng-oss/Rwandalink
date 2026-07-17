"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, Award, Users } from "lucide-react";
import Link from "next/link";

interface Program {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: string;
  image: string | null;
  requirements: string | null;
  learningOutcomes: string | null;
}

const gradients = [
  "from-blue-600 to-blue-800",
  "from-emerald-600 to-emerald-800",
  "from-red-600 to-red-800",
  "from-purple-600 to-purple-800",
  "from-amber-500 to-red-700",
  "from-teal-600 to-blue-800",
  "from-indigo-600 to-indigo-800",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProgramsClient() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetch("/api/programs")
      .then((r) => r.json())
      .then((data) => {
        setPrograms(Array.isArray(data) ? data.filter((p: Program) => p.description) : []);
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
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Programs</span>
            </nav>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Training{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400">
                Programs
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-12">
              Build your digital skills with our professionally designed training
              programs. From coding to networking, we prepare you for the
              technology careers of tomorrow.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { icon: BookOpen, value: String(programs.length || "7"), label: "Programs" },
                { icon: Clock, value: "4-6", label: "Months Duration" },
                { icon: Award, value: "1000+", label: "Graduates" },
                { icon: Users, value: "95%", label: "Completion Rate" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <stat.icon className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                variants={itemVariants}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {program.image ? (
                  <div className="relative h-48">
                    <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm text-white">
                      <Clock className="w-4 h-4" />
                      <span>{program.duration}</span>
                    </div>
                  </div>
                ) : (
                  <div className={`bg-gradient-to-br ${gradients[index % gradients.length]} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{program.duration}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {program.description}
                  </p>

                  {program.learningOutcomes && (
                    <p className="text-gray-500 text-xs mb-4 line-clamp-2">
                      {program.learningOutcomes}
                    </p>
                  )}

                  <Link
                    href={`/programs/${program.slug}`}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm group/link"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-3xl p-10 md:p-14 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Can&apos;t Find What You&apos;re Looking For?
              </h3>
              <p className="text-blue-100 max-w-2xl mx-auto mb-8">
                We offer customized training programs for organizations and
                individuals. Tell us what you need and we&apos;ll create a
                program just for you.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/25"
              >
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
