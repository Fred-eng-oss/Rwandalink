'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Wrench,
  BookOpen,
  ClipboardList,
  MessageSquare,
  Mail,
  Newspaper,
  TrendingUp,
  Plus,
} from 'lucide-react'

interface Stats {
  services: number
  programs: number
  registrations: number
  requests: number
  messages: number
  news: number
}

const statCards: {
  key: keyof Stats
  label: string
  icon: React.ElementType
  color: string
  href: string
}[] = [
  { key: 'services', label: 'Services', icon: Wrench, color: 'border-blue-500', href: '/admin/services' },
  { key: 'programs', label: 'Programs', icon: BookOpen, color: 'border-emerald-500', href: '/admin/programs' },
  { key: 'registrations', label: 'Registrations', icon: ClipboardList, color: 'border-violet-500', href: '/admin/registrations' },
  { key: 'requests', label: 'Service Requests', icon: MessageSquare, color: 'border-amber-500', href: '/admin/service-requests' },
  { key: 'messages', label: 'Messages', icon: Mail, color: 'border-rose-500', href: '/admin/messages' },
  { key: 'news', label: 'News Articles', icon: Newspaper, color: 'border-cyan-500', href: '/admin/news' },
]

const quickActions = [
  { label: 'Add Service', href: '/admin/services', icon: Plus },
  { label: 'Add Program', href: '/admin/programs', icon: Plus },
  { label: 'Post News', href: '/admin/news', icon: Plus },
  { label: 'View Messages', href: '/admin/messages', icon: Mail },
]

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    services: 0,
    programs: 0,
    registrations: 0,
    requests: 0,
    messages: 0,
    news: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const token = localStorage.getItem('admin_token')
        const res = await fetch('/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.ok) {
          const data = await res.json()
          setStats(data)
        }
      } catch {
        // keep defaults
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back. Here&apos;s an overview of your platform.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.key}
              href={card.href}
              className={`flex items-center gap-4 rounded-xl border-l-4 ${card.color} bg-white p-5 shadow-sm transition-shadow hover:shadow-md`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-50">
                <Icon className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? '—' : stats[card.key]}
                </p>
                <p className="text-sm text-gray-500">{card.label}</p>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="space-y-2">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 rounded-lg border border-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <Icon className="h-4 w-4 text-gray-400" />
                  {action.label}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">Platform Summary</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between border-b border-gray-100 py-2 text-sm">
              <span className="text-gray-500">Total Services</span>
              <span className="font-medium text-gray-900">{loading ? '—' : stats.services}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-2 text-sm">
              <span className="text-gray-500">Active Programs</span>
              <span className="font-medium text-gray-900">{loading ? '—' : stats.programs}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-2 text-sm">
              <span className="text-gray-500">Pending Requests</span>
              <span className="font-medium text-gray-900">{loading ? '—' : stats.requests}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-2 text-sm">
              <span className="text-gray-500">Unread Messages</span>
              <span className="font-medium text-gray-900">{loading ? '—' : stats.messages}</span>
            </div>
            <div className="flex justify-between py-2 text-sm">
              <span className="text-gray-500">Published News</span>
              <span className="font-medium text-gray-900">{loading ? '—' : stats.news}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
