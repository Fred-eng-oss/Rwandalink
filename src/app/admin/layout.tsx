'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  Wrench,
  BookOpen,
  Newspaper,
  ClipboardList,
  MessageSquare,
  Quote,
  Users,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  FileText,
  Home,
  Info,
  Phone,
  Bell,
} from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
]

const contentItems = [
  { href: '/admin/pages/home', label: 'Home Page', icon: Home },
  { href: '/admin/pages/about', label: 'About Page', icon: Info },
  { href: '/admin/services', label: 'Services', icon: Wrench },
  { href: '/admin/programs', label: 'Programs', icon: BookOpen },
  { href: '/admin/news', label: 'News', icon: Newspaper },
  { href: '/admin/pages/contact', label: 'Contact Page', icon: Phone },
]

const manageItems = [
  { href: '/admin/registrations', label: 'Registrations', icon: ClipboardList },
  { href: '/admin/service-requests', label: 'Service Requests', icon: MessageSquare },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Quote },
  { href: '/admin/team', label: 'Team', icon: Users },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
  { href: '/admin/notifications', label: 'Notifications', icon: Bell },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userName, setUserName] = useState('')

  const isLoginPage = pathname === '/admin'
  const isPublicAdminPage =
    pathname === '/admin/forgot-password' ||
    pathname === '/admin/verify-code' ||
    pathname === '/admin/reset-password'

  useEffect(() => {
    if (isLoginPage || isPublicAdminPage) return
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.replace('/admin')
      return
    }
    try {
      const raw = localStorage.getItem('admin_user')
      if (raw) {
        const user = JSON.parse(raw)
        setUserName(user.name || user.email || 'Admin')
      }
    } catch {
      setUserName('Admin')
    }
  }, [isLoginPage, isPublicAdminPage, router])

  function handleLogout() {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    document.cookie = 'admin_token=; path=/; max-age=0'
    router.replace('/admin')
  }

  if (isLoginPage || isPublicAdminPage) {
    return <>{children}</>
  }

  function renderSection(title: string, items: typeof navItems) {
    return (
      <div className="mb-4">
        <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</p>
        {items.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`mb-0.5 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-900 text-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-700 px-4">
          <img src="/images/SMART.png" alt="SmartLink" className="h-8 w-auto" />
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {renderSection('Overview', navItems)}
          {renderSection('Page Manager', contentItems)}
          {renderSection('Manage', manageItems)}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">{userName}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
