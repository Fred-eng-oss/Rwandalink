"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { GraduationCap, FolderCheck, Clock, ThumbsUp } from "lucide-react";

function StatsCounter({
  value,
  suffix,
  duration = 2,
}: {
  value: number;
  suffix: string;
  duration?: number;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const display = useTransform(rounded, (latest) => `${latest}${suffix}`);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      ease: "easeOut",
    });
    return controls.stop;
  }, [count, value, duration]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const stats = [
  {
    icon: GraduationCap,
    value: 500,
    suffix: "+",
    label: "Students Trained",
    description: "Graduates ready for the digital workforce",
  },
  {
    icon: FolderCheck,
    value: 50,
    suffix: "+",
    label: "Projects Completed",
    description: "Successful IT solutions delivered",
  },
  {
    icon: Clock,
    value: 10,
    suffix: "+",
    label: "Years Experience",
    description: "Serving Rwanda's tech community",
  },
  {
    icon: ThumbsUp,
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Happy clients across the country",
  },
];

export default function StatsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/DSC_0089.JPG.jpeg')" }}
      />
      <div className="absolute inset-0 bg-blue-900/90 dark:bg-slate-950/90" />
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Our Impact in <span className="text-amber-400">Numbers</span>
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            Measuring our success through the achievements of our students and
            the satisfaction of our clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center">
                <stat.icon className="w-8 h-8 text-amber-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                <StatsCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {stat.label}
              </h3>
              <p className="text-blue-100 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
