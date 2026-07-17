"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  Star,
  Shield,
  Heart,
  Users,
  GraduationCap,
} from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We constantly explore new technologies and creative approaches to deliver cutting-edge solutions that keep our clients ahead of the curve.",
    color: "from-blue-600 to-blue-700",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200",
  },
  {
    icon: Star,
    title: "Excellence",
    description:
      "We pursue the highest standards in everything we do, from code quality to customer service, ensuring exceptional outcomes for every project.",
    color: "from-emerald-600 to-emerald-700",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    borderColor: "border-emerald-200",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We conduct business with honesty, transparency, and ethical standards, building trust through every interaction and decision.",
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-500",
    borderColor: "border-amber-200",
  },
  {
    icon: Heart,
    title: "Customer Focus",
    description:
      "Our clients are at the heart of everything we do. We listen, understand, and tailor solutions that address their unique needs and goals.",
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-50",
    iconColor: "text-rose-500",
    borderColor: "border-rose-200",
  },
  {
    icon: Users,
    title: "Teamwork",
    description:
      "We believe in the power of collaboration. Our diverse team works together synergistically to deliver comprehensive solutions.",
    color: "from-violet-600 to-violet-700",
    bgColor: "bg-violet-50",
    iconColor: "text-violet-600",
    borderColor: "border-violet-200",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "We are committed to building Rwanda's digital capacity through training, mentorship, and knowledge sharing at every level.",
    color: "from-cyan-600 to-cyan-700",
    bgColor: "bg-cyan-50",
    iconColor: "text-cyan-600",
    borderColor: "border-cyan-200",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function CoreValues() {
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
          <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full mb-4">
            What Drives Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These fundamental principles guide our decisions, shape our culture,
            and define how we interact with clients, partners, and each other.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={cardVariants}
              className="group"
            >
              <div
                className={`relative bg-white border ${value.borderColor} rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div
                  className={`w-14 h-14 ${value.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <value.icon className={`w-7 h-7 ${value.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
