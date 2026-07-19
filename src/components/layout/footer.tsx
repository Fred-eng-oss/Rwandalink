'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  MessageCircle,
  Share2,
  Camera,
  Send,
  ArrowRight,
  Code,
} from 'lucide-react'
import { useSettings } from '@/hooks/use-settings'

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Programs', href: '/programs' },
  { name: 'News', href: '/news' },
  { name: 'Contact', href: '/contact' },
]

const defaultServices = [
  'Website Design & Development',
  'Custom Business Systems',
  'Web Hosting',
  'Business Email Setup',
  'Computer & Laptop Repair',
  'IT Support & Consulting',
]

const defaultPrograms = [
  'Software Development & Engineering',
  'Networking & Internet Technology',
  'Computer System & Architecture',
  'Electrical Technology',
  'Electronics & Telecommunication',
  'Accounting',
  'IoT & Robotics',
]

const socials = [
  { name: 'Facebook', icon: Globe, key: 'social_facebook' },
  { name: 'Twitter', icon: MessageCircle, key: 'social_twitter' },
  { name: 'LinkedIn', icon: Share2, key: 'social_linkedin' },
  { name: 'Instagram', icon: Camera, key: 'social_instagram' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const { get } = useSettings()

  const phone1 = get('company_phone_1', '0781899755')
  const phone2 = get('company_phone_2', '0736691969')
  const companyEmail = get('company_email', 'elysecag@gmail.com')
  const address = get('company_address', 'Gisozi, Kigali, Rwanda')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const formatPhone = (p: string) => p.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex mb-5 rounded-lg bg-white p-2">
              <img
                src="/images/smart.png.jpeg"
                alt="SmartLink Rwanda"
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 mb-6 max-w-sm">
              {get('company_description', 'Empowering Rwanda through innovative ICT solutions, digital skills training, and technology-driven programs that bridge the digital divide.')}
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shrink-0"
                aria-label="Subscribe"
              >
                {subscribed ? (
                  <span className="text-sm font-medium">Subscribed!</span>
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white hover:pl-1 transition-all duration-200 inline-flex items-center gap-1"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {defaultServices.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-sm text-slate-400 hover:text-white hover:pl-1 transition-all duration-200"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Our Programs
            </h3>
            <ul className="space-y-2.5">
              {defaultPrograms.map((p) => (
                <li key={p}>
                  <Link
                    href="/programs"
                    className="text-sm text-slate-400 hover:text-white hover:pl-1 transition-all duration-200"
                  >
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                Contact Info
              </h3>
              <div className="space-y-2.5 text-sm">
                <a href={`tel:${phone1.replace(/\s/g, '')}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                  {formatPhone(phone1)} / {formatPhone(phone2)}
                </a>
                <a href={`mailto:${companyEmail}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  {companyEmail}
                </a>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  {address}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                Business Hours
              </h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <p>{get('business_hours_weekdays', 'Monday \u2013 Friday: 8:00 AM \u2013 5:00 PM')}</p>
                    <p>{get('business_hours_saturday', 'Saturday: 9:00 AM \u2013 1:00 PM')}</p>
                    <p>{get('business_hours_sunday', 'Sunday: Closed')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                Follow Us
              </h3>
              <div className="flex gap-3">
                {socials.map((s) => {
                  const href = get(s.key, '#');
                  return (
                    <a
                      key={s.name}
                      href={href || '#'}
                      aria-label={s.name}
                      target={href && href !== '#' ? '_blank' : undefined}
                      rel={href && href !== '#' ? 'noopener noreferrer' : undefined}
                      className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <s.icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
              <p className="text-sm text-slate-400 mt-2">
                Stay connected with us on social media for the latest updates and programs.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} {get('company_name', 'SmartLink Rwanda')}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/admin" className="hover:text-white transition-colors">
              Admin
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-800/50 text-center">
          <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
            <Code className="w-3.5 h-3.5" />
            Website Designed & Developed by{' '}
            <a
              href="mailto:fredmugisha094@gmail.com"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 hover:tracking-wide"
            >
              Mugisha Fred
            </a>
          </p>
          <a
            href="mailto:fredmugisha094@gmail.com"
            className="text-[11px] text-slate-600 hover:text-slate-400 transition-colors duration-300"
          >
            fredmugisha094@gmail.com
          </a>
        </div>
      </div>
    </footer>
  )
}
