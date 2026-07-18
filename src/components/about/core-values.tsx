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
import { useSettings } from "@/hooks/use-settings";

const iconMap = [Lightbulb, Star, Shield, Heart, Users, GraduationCap];
const colorMap = [
  { bg: "bg-blue-50", icon: "text-blue-600", border: "border-blue-200" },
  { bg: "bg-emerald-50", icon: "text-emerald-600", border: "border-emerald-200" },
  { bg: "bg-amber-50", icon: "text-amber-500", border: "border-amber-200" },
  { bg: "bg-rose-50", icon: "text-rose-500", border: "border-rose-200" },
  { bg: "bg-violet-50", icon: "text-violet-600", border: "border-violet-200" },
  { bg: "bg-cyan-50", icon: "text-cyan-600", border: "border-cyan-200" },
];

const defaultValues = [
  { title: "Innovation", description: "We constantly explore new technologies and creative approaches to deliver cutting-edge solutions that keep our clients ahead of the curve." },
  { title: "Excellence", description: "We pursue the highest standards in everything we do, from code quality to customer service, ensuring exceptional outcomes for every project." },
  { title: "Integrity", description: "We conduct business with honesty, transparency, and ethical standards, building trust through every interaction and decision." },
  { title: "Customer Focus", description: "Our clients are at the heart of everything we do. We listen, understand, and tailor solutions that address their unique needs and goals." },
  { title: "Teamwork", description: "We believe in the power of collaboration. Our diverse team works together synergistically to deliver comprehensive solutions." },
  { title: "Education", description: "We are committed to building Rwanda's digital capacity through training, mentorship, and knowledge sharing at every level." },
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
  const { get } = useSettings();

  const values = defaultValues.map((def, i) => {
    const n = i + 1;
    return {
      icon: iconMap[i],
      title: get(`about_value_${n}_title`, def.title),
      description: get(`about_value_${n}_desc`, def.description),
      ...colorMap[i],
    };
  });

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
                className={`relative bg-white border ${value.border} rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div
                  className={`w-14 h-14 ${value.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <value.icon className={`w-7 h-7 ${value.icon}`} />
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
