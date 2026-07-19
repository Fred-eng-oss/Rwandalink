'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Mail, Loader2, CheckCircle, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [pendingToken, setPendingToken] = useState('')
  const [pendingExpiresAt, setPendingExpiresAt] = useState('')
  const [pendingOtp, setPendingOtp] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmedEmail = email.trim().toLowerCase()
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address')
      return
    }

    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        toast.error(data.error || 'Something went wrong')
        return
      }

      setPendingToken(data.token || '')
      setPendingExpiresAt(data.expiresAt || '')
      setPendingOtp(data.otp || '')
      setSuccess(true)
      toast.success('Verification code sent successfully')
      setTimeout(() => {
        router.push(`/admin/verify-code?token=${data.token}&expiresAt=${data.expiresAt}`)
      }, 250)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_#0f172a,_#1e293b)] px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur">
        <Link
          href="/admin"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Forgot Password?</h1>
          <p className="mt-2 text-sm text-gray-500">
            Enter your email address and we&apos;ll send you a verification code to reset your password.
          </p>
        </div>

        {success ? (
          <div className="space-y-3 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
              <CheckCircle className="h-7 w-7 text-green-600" />
            </div>
            <p className="font-medium text-green-600">A verification code has been sent to your email.</p>
            {pendingOtp ? (
              <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                <p className="font-semibold">Fast local code</p>
                <p className="mt-1 font-mono text-lg tracking-[0.35em]">{pendingOtp}</p>
              </div>
            ) : null}
            <p className="text-sm text-gray-500">Opening the verification page...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-10 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Enter your email address"
                  autoComplete="email"
                  autoFocus
                />
                <ShieldCheck className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
              {loading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
