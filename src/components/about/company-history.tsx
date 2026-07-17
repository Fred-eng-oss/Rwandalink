"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Code2,
  Users,
  Award,
  Globe,
  GraduationCap,
  Building,
  Zap,
} from "lucide-react";

const timeline = [
  {
    year: "2013",
    title: "Company Founded",
    description:
      "SmartLink Rwanda was established with a vision to bridge the technology gap in Rwanda's digital economy.",
    icon: Rocket,
    color: "bg-blue-600",
  },
  {
    year: "2015",
    title: "First Major Contract",
    description:
      "Secured our first enterprise-level project, building a custom management system for a leading Rwandan business.",
    icon: Building,
    color: "bg-emerald-600",
  },
  {
    year: "2017",
    title: "Training Programs Launch",
    description:
      "Launched our signature IT internship programs, beginning with Software Development and Networking courses.",
    icon: GraduationCap,
    color: "bg-amber-500",
  },
  {
    year: "2018",
    title: "Team Expansion",
    description:
      "Grew our team to over 20 technology professionals, expanding our service offerings significantly.",
    icon: Users,
    color: "bg-violet-600",
  },
  {
    year: "2019",
    title: "Digital Solutions Suite",
    description:
      "Developed our comprehensive web hosting, email solutions, and business management platform.",
    icon: Code2,
    color: "bg-cyan-600",
  },
  {
    year: "2020",
    title: "National Recognition",
    description:
      "Received industry recognition for excellence in ICT services and commitment to digital transformation.",
    icon: Award,
    color: "bg-rose-600",
  },
  {
    year: "2022",
    title: "Country-Wide Reach",
    description:
      "Extended our services and support infrastructure to cover over 30 districts across Rwanda.",
    icon: Globe,
    color: "bg-blue-600",
  },
  {
    year: "2024",
    title: "Innovation Hub",
    description:
      "Launched the SmartLink Innovation Hub, expanding into IoT, advanced networking, and emerging technologies.",
    icon: Zap,
    color: "bg-emerald-600",
  },
];

export default function CompanyHistory() {
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
            Our Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Company History
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From a small startup to Rwanda&apos;s leading technology solutions
            provider - a journey of innovation, growth, and impact.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-200 via-emerald-200 to-amber-200 hidden md:block" />

          <div className="space-y-12">
            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-full md:w-1/2 ${
                      isLeft ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                    }`}
                  >
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-bold text-white ${item.color} rounded-full mb-3`}
                      >
                        {item.year}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 hidden md:flex">
                    <div
                      className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
