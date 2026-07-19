'use client'

import { useState, useEffect, Suspense, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Lock, Eye, EyeOff, Loader2, CheckCircle, Shield } from 'lucide-react'
import toast from 'react-hot-toast'
import { getPasswordStrength, validatePasswordRequirements } from '@/lib/password-reset'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tokenFromUrl = searchParams.get('token') || ''

  const [resetToken, setResetToken] = useState(tokenFromUrl)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!tokenFromUrl) {
      router.replace('/admin/forgot-password')
    }
    setResetToken(tokenFromUrl)
  }, [tokenFromUrl, router])

  const strength = useMemo(() => getPasswordStrength(password), [password])
  const passwordValidation = useMemo(() => validatePasswordRequirements(password), [password])
  const requirements = passwordValidation.requirements
  const allRequirementsMet = passwordValidation.valid

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!allRequirementsMet) {
      setError('Please meet all password requirements')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resetToken, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        toast.error(data.error || 'Something went wrong')
        return
      }

      setSuccess(true)
      toast.success('Password changed successfully')
      setTimeout(() => router.push('/admin'), 3000)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <Link
          href="/admin/verify-code"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          <p className="mt-2 text-sm text-gray-500">
            Create a new strong password for your account.
          </p>
        </div>

        {success ? (
          <div className="text-center space-y-3">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
              <CheckCircle className="h-7 w-7 text-green-600" />
            </div>
            <p className="text-green-600 font-medium">Password changed successfully.</p>
            <p className="text-sm text-gray-500">Redirecting to login in 3 seconds...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError('') }}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-10 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Enter new password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {password.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${strength.color}`}
                      style={{ width: `${(strength.score / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-600 shrink-0">{strength.label}</span>
                </div>

                <div className="space-y-1.5">
                  {requirements.map((req) => (
                    <div key={req.label} className="flex items-center gap-2">
                      <div className={`h-4 w-4 rounded-full flex items-center justify-center ${req.met ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {req.met && <CheckCircle className="h-3 w-3 text-green-600" />}
                      </div>
                      <span className={`text-xs ${req.met ? 'text-green-600' : 'text-gray-500'}`}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError('') }}
                className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:ring-2 focus:ring-blue-500/20 ${
                  confirmPassword && password !== confirmPassword
                    ? 'border-red-300 focus:border-red-500'
                    : confirmPassword && password === confirmPassword
                    ? 'border-green-300 focus:border-green-500'
                    : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Confirm new password"
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
              )}
              {confirmPassword && password === confirmPassword && (
                <p className="mt-1 text-xs text-green-600">Passwords match</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !allRequirementsMet || password !== confirmPassword}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Shield className="h-4 w-4" />
              )}
              {loading ? 'Saving...' : 'Save New Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <Loader2 className="h-8 w-8 text-white animate-spin" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  )
}
