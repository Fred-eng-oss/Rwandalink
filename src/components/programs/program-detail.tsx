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
  ChevronRight,
  CheckCircle2,
  BookOpen,
  Target,
  Award,
  Calendar,
  GraduationCap,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  code: Code2,
  network: Network,
  cpu: Cpu,
  palette: Palette,
  monitor: Monitor,
};

interface ProgramDetailProps {
  program: {
    id: string;
    slug: string;
    title: string;
    shortDescription: string;
    description: string;
    duration: string;
    level?: string;
    icon?: string;
    image?: string | null;
    highlights?: string[];
    requirements?: string[];
    outcomes?: string[];
    modules?: string[];
  };
}

export default function ProgramDetail({ program }: ProgramDetailProps) {
  const Icon = iconMap[program.icon || ""] || Code2;
  const highlights = program.highlights || [];
  const requirements = program.requirements || [];
  const outcomes = program.outcomes || [];
  const modules = program.modules || [];
  const level = program.level || "All Levels";

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
                href="/programs"
                className="hover:text-white transition-colors"
              >
                Programs
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{program.title}</span>
            </nav>

            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center">
                <Icon className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  {program.title}
                </h1>
                <div className="flex items-center gap-4 mt-2">
                  <span className="inline-flex items-center gap-1.5 text-blue-200 text-sm">
                    <Clock className="w-4 h-4" />
                    {program.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-blue-200 text-sm">
                    <GraduationCap className="w-4 h-4" />
                    {level}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl leading-relaxed">
              {program.shortDescription}
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
                About This Program
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-10">
                {program.description}
              </p>

              <div className="grid sm:grid-cols-3 gap-6 mb-12">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
                  <Clock className="w-8 h-8 text-blue-800 mx-auto mb-3" />
                  <div className="text-lg font-bold text-gray-900">
                    {program.duration}
                  </div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 text-center">
                  <GraduationCap className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                  <div className="text-lg font-bold text-gray-900">
                    {level}
                  </div>
                  <div className="text-sm text-gray-600">Level</div>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 text-center">
                  <Award className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                  <div className="text-lg font-bold text-gray-900">
                    Certificate
                  </div>
                  <div className="text-sm text-gray-600">Upon Completion</div>
                </div>
              </div>

              {highlights.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-8 mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Target className="w-7 h-7 text-emerald-600" />
                    Program Highlights
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="sticky top-24 space-y-6">
                <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-4">Ready to Enroll?</h3>
                  <p className="text-blue-100 text-sm mb-6">
                    Secure your spot in the {program.title} program and start
                    building your technology career today.
                  </p>
                  <Link
                    href="/register"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
                  >
                    Register Now
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-800" />
                    Quick Info
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium text-gray-900">
                        {program.duration}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Level</span>
                      <span className="font-medium text-gray-900">
                        {level}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Certification</span>
                      <span className="font-medium text-gray-900">
                        Yes, included
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Need Guidance?
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Our education advisors can help you choose the right program
                    for your career goals.
                  </p>
                  <Link
                    href="/contact"
                    className="text-blue-800 text-sm font-medium hover:underline"
                  >
                    Talk to an Advisor →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {modules.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <BookOpen className="w-7 h-7 text-blue-800" />
                    Course Modules
                  </h3>
                  <div className="space-y-4">
                    {modules.map((module, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all duration-300"
                      >
                        <div className="w-10 h-10 bg-blue-800 text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{module}</h4>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <div className="space-y-12">
              {requirements.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                    Requirements
                  </h3>
                  <div className="space-y-3">
                    {requirements.map((req, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 bg-white border border-gray-100 rounded-xl"
                      >
                        <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-gray-700">{req}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {outcomes.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <Award className="w-7 h-7 text-amber-500" />
                    Learning Outcomes
                  </h3>
                  <div className="space-y-3">
                    {outcomes.map((outcome, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 bg-white border border-gray-100 rounded-xl"
                      >
                        <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Award className="w-4 h-4 text-amber-500" />
                        </div>
                        <span className="text-gray-700">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
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
              Start Your Technology Journey Today
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              Don&apos;t miss the opportunity to build valuable skills that will
              transform your career. Enroll in the {program.title} program at
              SmartLink Rwanda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/25"
              >
                Register for {program.title}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-colors"
              >
                Ask a Question
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
