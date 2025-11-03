'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const router = useRouter()
  const supabase = createClient()

  const handleSignUp = async () => {
    setLoading(true)
    setError(null)
    setMessage(null)
    try {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError(error.message)
      } else {
        setMessage('Check your email to confirm your account.')
      }
    } catch (err) {
      setError('Unexpected error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      setError('Unexpected error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', padding: 24 }}>
      <h1 style={{ marginBottom: 16 }}>Welcome</h1>

      {error && (
        <div style={{ color: '#b00020', marginBottom: 12 }}>{error}</div>
      )}
      {message && (
        <div style={{ color: '#0b6b0b', marginBottom: 12 }}>{message}</div>
      )}

      <form onSubmit={handleSignIn}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          style={{ width: '100%', padding: 8, marginBottom: 12, border: '1px solid #ccc', borderRadius: 4 }}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          style={{ width: '100%', padding: 8, marginBottom: 12, border: '1px solid #ccc', borderRadius: 4 }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: 10, marginBottom: 8 }}
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>

      <button
        type="button"
        onClick={handleSignUp}
        disabled={loading}
        style={{ width: '100%', padding: 10 }}
      >
        Sign Up
      </button>
    </div>
  )
}