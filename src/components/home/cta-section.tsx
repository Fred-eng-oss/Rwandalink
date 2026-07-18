"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { useSettings } from "@/hooks/use-settings";

export default function CtaSection() {
  const { get } = useSettings();

  const phone1 = get('company_phone_1', '0781899755');
  const phone2 = get('company_phone_2', '0736691969');
  const email = get('company_email', 'elysecag@gmail.com');

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${get('home_cta_image', '/images/DSC_0084.JPG.jpeg')}')` }}
      />
      <div className="absolute inset-0 bg-blue-900/90 dark:bg-slate-950/90" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Phone className="w-10 h-10 text-amber-400" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {get('home_cta_title', 'Ready to Transform Your Business?')}
          </h2>

          <p className="text-blue-100/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {get('home_cta_description', 'Whether you need IT services, professional training, or expert consultancy, SmartLink Rwanda is here to help you succeed in the digital age.')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={get('home_cta_button_link', '/contact')}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:-translate-y-0.5"
            >
              {get('home_cta_button_text', 'Contact Us')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              View Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Quick Contact */}
          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-6 text-white/90 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <a
              href={`tel:${phone1.replace(/\s/g, '')}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{phone1.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')}</span>
            </a>
            <a
              href={`tel:${phone2.replace(/\s/g, '')}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{phone2.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')}</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <span>{email}</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
