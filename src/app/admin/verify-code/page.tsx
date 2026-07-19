'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Shield, Loader2, CheckCircle, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

function VerifyCodeForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tokenFromUrl = searchParams.get('token') || ''
  const expiresAtFromUrl = searchParams.get('expiresAt') || ''

  const [token, setToken] = useState(tokenFromUrl)
  const [expiresAt, setExpiresAt] = useState(expiresAtFromUrl)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(10)
  const [resendLoading, setResendLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [attemptsUsed, setAttemptsUsed] = useState(0)

  useEffect(() => {
    if (!tokenFromUrl) {
      router.replace('/admin/forgot-password')
    }
    setToken(tokenFromUrl)
  }, [tokenFromUrl, router])

  useEffect(() => {
    if (expiresAtFromUrl) {
      setExpiresAt(expiresAtFromUrl)
    }
  }, [expiresAtFromUrl])

  useEffect(() => {
    if (resendCooldown <= 0) return
    const timer = setInterval(() => setResendCooldown((c) => c - 1), 1000)
    return () => clearInterval(timer)
  }, [resendCooldown])

  useEffect(() => {
    if (!expiresAt) return
    const target = new Date(expiresAt).getTime()

    const updateTimer = () => {
      const now = Date.now()
      const diff = Math.max(0, Math.floor((target - now) / 1000))
      setTimeLeft(diff)
    }

    updateTimer()
    const timer = setInterval(updateTimer, 1000)
    return () => clearInterval(timer)
  }, [expiresAt])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1)
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError('')

    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`)
      next?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`)
      prev?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!pasted) return
    const newOtp = pasted.split('').concat(Array(6).fill('')).slice(0, 6)
    setOtp(newOtp)
    const focusIndex = Math.min(pasted.length, 5)
    document.getElementById(`otp-${focusIndex}`)?.focus()
  }

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    const code = otp.join('')
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code')
      return
    }

    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, otp: code }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Verification failed')
        setAttemptsUsed((prev) => prev + 1)
        toast.error(data.error || 'Verification failed')
        return
      }

      setSuccess(true)
      toast.success('OTP verified successfully')
      setTimeout(() => {
        router.push(`/admin/reset-password?token=${data.resetToken}`)
      }, 1200)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [otp, token, router])

  async function handleResend() {
    setResendLoading(true)
    setError('')
    setOtp(['', '', '', '', '', ''])

    try {
      const res = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to resend code')
        toast.error(data.error || 'Failed to resend code')
        return
      }

      toast.success('A new verification code has been sent')
      if (data.token) {
        setToken(data.token)
        if (data.expiresAt) {
          setExpiresAt(data.expiresAt)
        }
        const url = new URL(window.location.href)
        url.searchParams.set('token', data.token)
        if (data.expiresAt) {
          url.searchParams.set('expiresAt', data.expiresAt)
        }
        window.history.replaceState({}, '', url.toString())
      }

      setResendCooldown(10)
    } catch {
      setError('Failed to resend code. Please try again.')
    } finally {
      setResendLoading(false)
    }
  }

  const otpCode = otp.join('')
  const isComplete = otpCode.length === 6

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <Link
          href="/admin/forgot-password"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Verify Code</h1>
          <p className="mt-2 text-sm text-gray-500">
            Enter the 6-digit verification code sent to your email.
          </p>
        </div>

        {success ? (
          <div className="text-center space-y-3">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
              <CheckCircle className="h-7 w-7 text-green-600" />
            </div>
            <p className="text-green-600 font-medium">Verification successful!</p>
            <p className="text-sm text-gray-500">Redirecting to reset password...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {attemptsUsed > 0 && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-700">
                You have used {attemptsUsed} attempt{attemptsUsed > 1 ? 's' : ''}. A maximum of 5 attempts is allowed.
              </div>
            )}

            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700 text-center">
                Verification Code
              </label>
              {timeLeft !== null && (
                <div className="text-center mb-4">
                  {timeLeft > 0 ? (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
                      Code expires in {formatTime(timeLeft)}
                    </span>
                  ) : (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-600">
                      Code expired! Please request a new code.
                    </span>
                  )}
                </div>
              )}
              <div className="flex justify-center gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    onPaste={i === 0 ? handleOtpPaste : undefined}
                    disabled={timeLeft !== null && timeLeft <= 0}
                    className="h-12 w-12 rounded-lg border border-gray-300 bg-white text-center text-lg font-bold text-gray-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    autoFocus={i === 0}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !isComplete || (timeLeft !== null && timeLeft <= 0)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shield className="h-4 w-4" />}
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>

            <div className="text-center">
              {resendCooldown > 0 ? (
                <p className="text-sm text-gray-500">
                  Resend code in <span className="font-medium text-gray-700">{resendCooldown}s</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendLoading}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-50"
                >
                  {resendLoading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <RefreshCw className="h-3.5 w-3.5" />
                  )}
                  Resend Code
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default function VerifyCodePage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <Loader2 className="h-8 w-8 text-white animate-spin" />
      </div>
    }>
      <VerifyCodeForm />
    </Suspense>
  )
}
