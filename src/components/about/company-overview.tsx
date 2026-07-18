"use client";

import { motion } from "framer-motion";
import {
  Users,
  Award,
  Globe,
  TrendingUp,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { useSettings } from "@/hooks/use-settings";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function CompanyOverview() {
  const { get } = useSettings();

  const stats = [
    { icon: Users, value: get('about_stat_1_value', '5,000+'), label: get('about_stat_1_label', 'Clients Served') },
    { icon: Award, value: get('about_stat_2_value', '10+'), label: get('about_stat_2_label', 'Years Experience') },
    { icon: Globe, value: get('about_stat_3_value', '30+'), label: get('about_stat_3_label', 'Districts Covered') },
    { icon: TrendingUp, value: get('about_stat_4_value', '500+'), label: get('about_stat_4_label', 'Projects Delivered') },
    { icon: Building2, value: get('about_stat_5_value', '50+'), label: get('about_stat_5_label', 'Enterprise Clients') },
    { icon: CheckCircle2, value: get('about_stat_6_value', '99%'), label: get('about_stat_6_label', 'Client Satisfaction') },
  ];

  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${get('about_overview_image', '/images/DSC_0015.JPG.jpeg')}')` }}
      />
      <div className="absolute inset-0 bg-blue-900/85 dark:bg-slate-950/90" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-emerald-400 text-sm font-medium rounded-full border border-white/20 mb-6">
            {get('about_overview_badge', 'About SmartLink Rwanda')}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {get('about_overview_title', 'Bridging the Technology Gap')}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            {get('about_overview_subtitle', 'Empowering individuals and businesses across Rwanda with innovative technology solutions that drive growth in the digital economy.')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="relative group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:border-white/20">
                <stat.icon className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-blue-200">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Who We Are
              </h2>
              <p className="text-blue-100 leading-relaxed mb-6">
                {get('about_overview_description', 'SmartLink Rwanda is a premier ICT company dedicated to bridging the technology gap in Rwanda\'s rapidly growing digital economy. Since our founding, we have been at the forefront of digital transformation, providing cutting-edge solutions that empower businesses and individuals alike.')}
              </p>
              <p className="text-blue-100 leading-relaxed mb-6">
                Our team of skilled professionals combines deep technical
                expertise with a profound understanding of the Rwandan market to
                deliver solutions that are not only innovative but also practical
                and scalable.
              </p>
              <p className="text-blue-100 leading-relaxed">
                From custom software development to comprehensive IT consulting,
                we offer a full spectrum of technology services designed to help
                our clients thrive in an increasingly digital world.
              </p>
            </div>
            <div className="space-y-6">
              {[
                {
                  title: "Local Expertise, Global Standards",
                  desc: "We combine deep knowledge of the Rwandan market with international best practices.",
                },
                {
                  title: "End-to-End Solutions",
                  desc: "From concept to deployment and ongoing support, we handle every aspect of your technology needs.",
                },
                {
                  title: "Community Impact",
                  desc: "We believe in technology as a tool for social and economic transformation in Rwanda.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-blue-200 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
