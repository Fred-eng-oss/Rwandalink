'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 lg:pt-20 flex items-center justify-center bg-slate-950">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-[10rem] font-extrabold leading-none bg-gradient-to-r from-blue-500 via-emerald-400 to-blue-600 bg-clip-text text-transparent select-none"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              404
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-3xl font-bold text-white mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Page Not Found
            </motion.h2>

            <motion.p
              className="text-slate-400 mt-4 text-base md:text-lg max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </motion.p>

            <motion.div
              className="flex items-center justify-center gap-4 mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Home className="w-4 h-4" />
                Go Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 px-6 py-3 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
