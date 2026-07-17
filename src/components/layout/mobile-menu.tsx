'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  X,
  Sun,
  Moon,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Programs', href: '/programs' },
  { name: 'News', href: '/news' },
  { name: 'Contact', href: '/contact' },
]

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  pathname: string
  darkMode: boolean
  toggleDark: () => void
}

export default function MobileMenu({
  open,
  onClose,
  pathname,
  darkMode,
  toggleDark,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-sm bg-white dark:bg-slate-900 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <img
                  src="/images/smart.png.jpeg"
                  alt="SmartLink Rwanda"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {navLinks.map((link, i) => {
                const active = pathname === link.href
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        active
                          ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                )
              })}

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <Link
                  href="/register"
                  onClick={onClose}
                  className="block mt-4 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-center font-semibold rounded-lg shadow-md"
                >
                  Register Now
                </Link>
              </motion.div>
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <button
                onClick={toggleDark}
                className="flex items-center gap-2 px-4 py-2 w-full rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>

              <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <a href="tel:+250781899755" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                  <Phone className="w-4 h-4 shrink-0" />
                  078 189 9755
                </a>
                <a href="mailto:elysecag@gmail.com" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                  <Mail className="w-4 h-4 shrink-0" />
                  elysecag@gmail.com
                </a>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Gisozi, Kigali, Rwanda</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
