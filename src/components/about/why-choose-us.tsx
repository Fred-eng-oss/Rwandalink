"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  Zap,
  Shield,
  HeadphonesIcon,
  TrendingUp,
  Clock,
  Award,
  MapPin,
} from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Proven Track Record",
    description:
      "Over a decade of delivering successful projects for businesses across Rwanda, from startups to large enterprises.",
  },
  {
    icon: Zap,
    title: "Cutting-Edge Technology",
    description:
      "We leverage the latest technologies and frameworks to build solutions that are fast, scalable, and future-proof.",
  },
  {
    icon: Shield,
    title: "Security First Approach",
    description:
      "Every solution we build incorporates industry-standard security practices to protect your data and digital assets.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description:
      "Our dedicated support team is available around the clock to ensure your systems run smoothly without interruption.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    description:
      "We design systems that grow with your business, ensuring your technology investment remains valuable as you expand.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description:
      "We understand the importance of deadlines. Our agile methodology ensures projects are delivered on time and on budget.",
  },
  {
    icon: MapPin,
    title: "Local Presence",
    description:
      "Being locally based in Rwanda means we understand the market, culture, and unique challenges businesses face here.",
  },
  {
    icon: CheckCircle,
    title: "End-to-End Service",
    description:
      "From initial consultation and design to development, deployment, and ongoing maintenance - we handle it all.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 text-sm font-medium rounded-full mb-4">
              The SmartLink Difference
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose{" "}
              <span className="text-blue-800">SmartLink Rwanda</span>?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              In a rapidly evolving digital landscape, choosing the right
              technology partner is critical. SmartLink Rwanda stands out through
              our unwavering commitment to excellence, deep local expertise, and
              a comprehensive approach to technology solutions.
            </p>

            <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">
                Our Promise to You
              </h3>
              <ul className="space-y-3">
                {[
                  "Personalized solutions tailored to your specific needs",
                  "Transparent pricing with no hidden costs",
                  "Regular progress updates throughout your project",
                  "Post-deployment training and documentation",
                  "Long-term partnership, not just a one-time service",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4"
          >
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                variants={itemVariants}
                className="group"
              >
                <div className="flex gap-5 p-5 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 bg-white">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-800 transition-colors duration-300">
                    <reason.icon className="w-6 h-6 text-blue-800 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {reason.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-10 md:p-14 border border-gray-100">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Join hundreds of satisfied clients who have partnered with
              SmartLink Rwanda to achieve their technology goals. Let&apos;s
              build something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-800 text-white rounded-xl font-semibold hover:bg-blue-900 transition-colors shadow-lg shadow-blue-800/25"
              >
                Get In Touch
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                Explore Our Services
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
