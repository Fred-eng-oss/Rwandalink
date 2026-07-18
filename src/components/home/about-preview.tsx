"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useSettings } from "@/hooks/use-settings";

const defaultHighlights = [
  "Professional IT Services & Support",
  "Industry-Recognized Certifications",
  "Hands-On Technical Training",
  "Custom Software Development",
];

export default function AboutPreview() {
  const { get } = useSettings();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-4">
              About SmartLink Rwanda
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {get('home_about_title', 'Your Trusted Partner in Digital Transformation')}
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {get('home_about_description', 'SmartLink Rwanda is a premier ICT company based in Gisozi, Kigali, dedicated to bridging the technology gap in Rwanda\'s growing digital economy. We provide comprehensive IT solutions, professional training, and expert consultancy services.')}
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Since our inception, we have been committed to empowering individuals
              and businesses with the technology skills and tools they need to
              thrive in the digital age. Our team of certified professionals
              delivers quality solutions tailored to your specific needs.
            </p>

            <ul className="space-y-3 mb-8">
              {defaultHighlights.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-3 text-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-blue-800 font-semibold hover:text-blue-900 transition-colors"
            >
              Learn More About Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Image Placeholder */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              {/* Background Image */}
              <img
                src={get('home_about_image', '/images/DSC_0030.JPG.jpeg')}
                alt="SmartLink Rwanda Team"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />

              {/* Overlay Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-4xl font-bold">SL</span>
                  </div>
                  <p className="text-lg font-medium opacity-90">SmartLink Rwanda</p>
                  <p className="text-sm opacity-70">Bridging the Digital Divide</p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white/30 rounded-lg rotate-12" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-2 border-white/20 rounded-full" />
            </div>

            {/* Floating Stats Card */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-emerald-600">10+</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Years of</p>
                  <p className="font-semibold text-gray-900">Excellence</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
