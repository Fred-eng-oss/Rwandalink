"use client";

import { motion } from "framer-motion";
import {
  Users,
  Award,
  DollarSign,
  Headphones,
  Lightbulb,
  GraduationCap,
} from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "Expert Team",
    description:
      "Our team consists of certified IT professionals with years of industry experience and deep technical knowledge.",
    color: "blue",
  },
  {
    icon: Award,
    title: "Quality Service",
    description:
      "We deliver high-quality solutions that meet international standards and exceed client expectations consistently.",
    color: "emerald",
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    description:
      "Premium IT services and training at competitive prices, making technology accessible to everyone in Rwanda.",
    color: "amber",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock technical support to ensure your systems run smoothly and issues are resolved quickly.",
    color: "blue",
  },
  {
    icon: Lightbulb,
    title: "Custom Solutions",
    description:
      "Tailored IT solutions designed to meet your specific business needs and drive your digital transformation.",
    color: "emerald",
  },
  {
    icon: GraduationCap,
    title: "Training Programs",
    description:
      "Comprehensive training programs with industry-recognized certifications to advance your IT career.",
    color: "amber",
  },
];

const colorMap = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    hover: "group-hover:bg-blue-800",
    hoverText: "group-hover:text-white",
  },
  emerald: {
    bg: "bg-emerald-100",
    text: "text-emerald-800",
    hover: "group-hover:bg-emerald-600",
    hoverText: "group-hover:text-white",
  },
  amber: {
    bg: "bg-amber-100",
    text: "text-amber-800",
    hover: "group-hover:bg-amber-500",
    hoverText: "group-hover:text-white",
  },
};

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 text-sm font-semibold rounded-full mb-4">
            Why SmartLink?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-blue-800">SmartLink Rwanda</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We stand out because of our commitment to excellence, innovation, and
            customer satisfaction in every service we deliver.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const colors = colorMap[reason.color as keyof typeof colorMap];
            return (
              <motion.div
                key={index}
                className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div
                  className={`w-14 h-14 rounded-xl ${colors.bg} ${colors.text} ${colors.hover} ${colors.hoverText} flex items-center justify-center mb-4 transition-all duration-300`}
                >
                  <reason.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-800 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
