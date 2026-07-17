"use client";

import { motion } from "framer-motion";
import { Target, Eye, ArrowRight } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
            Our Purpose
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mission & Vision
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Guided by a clear mission and an ambitious vision, we strive to
            transform Rwanda&apos;s technology landscape.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-900 rounded-3xl transform group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="relative bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 rounded-3xl p-8 md:p-10 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16" />

              <div className="relative">
                <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Our Mission
                </h3>
                <p className="text-blue-100 leading-relaxed text-lg mb-8">
                  To empower individuals and businesses with innovative
                  technology solutions that drive growth, efficiency, and success
                  in the digital economy. We are committed to making technology
                  accessible, affordable, and impactful for every Rwandan.
                </p>
                <div className="flex items-center text-emerald-400 font-medium group-hover:gap-3 gap-2 transition-all duration-300">
                  <span>Learn how we fulfill our mission</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl transform group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 rounded-3xl p-8 md:p-10 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16" />

              <div className="relative">
                <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Our Vision
                </h3>
                <p className="text-emerald-100 leading-relaxed text-lg mb-8">
                  To be Rwanda&apos;s leading technology solutions provider,
                  recognized for innovation, excellence, and commitment to
                  transforming the digital landscape. We envision a Rwanda where
                  technology empowers every individual and organization to reach
                  their full potential.
                </p>
                <div className="flex items-center text-white/90 font-medium group-hover:gap-3 gap-2 transition-all duration-300">
                  <span>See our vision in action</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
