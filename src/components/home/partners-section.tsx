"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "Government of Rwanda", abbr: "GoR" },
  { name: "Rwanda Development Board", abbr: "RDB" },
  { name: "Kigali City Council", abbr: "KCC" },
  { name: "Rwanda ICT Chamber", abbr: "ICT" },
  { name: "Smart Africa", abbr: "SA" },
  { name: "Africa Gathering", abbr: "AG" },
  { name: "Rwanda Energy Group", abbr: "REG" },
  { name: "Ministry of ICT", abbr: "MICT" },
];

export default function PartnersSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-4">
            Our Partners
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trusted By{" "}
            <span className="text-blue-800">Leading Organizations</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We are proud to work with government institutions, NGOs, and private
            sector organizations across Rwanda.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="group relative bg-gray-50 hover:bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 flex items-center justify-center min-h-[120px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ y: -3 }}
            >
              <div className="text-center">
                {/* Logo Placeholder */}
                <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300 flex items-center justify-center transition-all duration-300">
                  <span className="text-xl font-bold text-blue-800">
                    {partner.abbr}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-blue-800 transition-colors">
                  {partner.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12 p-8 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl border border-blue-100"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-700 mb-4">
            Want to partner with SmartLink Rwanda?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-blue-800 font-semibold hover:text-blue-900 transition-colors"
          >
            Get in touch with us
            <span className="text-lg">&rarr;</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
