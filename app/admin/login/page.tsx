'use client'

import { Suspense, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter, useSearchParams } from 'next/navigation'
import { Dog, Loader2 } from 'lucide-react'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/admin'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError('Email ou senha incorretos.'); setLoading(false); return }
    router.push(redirect)
  }

  function fillAdmin() {
    setEmail('moacirmayer@hotmail.com')
    setPassword('Santos@123')
  }

  return (
    <form onSubmit={handleLogin} className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-white/50 mb-1.5">Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@seusite.com"
          className="w-full px-3 py-2.5 rounded-lg text-sm bg-white/5 border border-white/10 text-white placeholder-white/25 outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors" />
      </div>
      <div>
        <label className="block text-xs font-medium text-white/50 mb-1.5">Senha</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"
          className="w-full px-3 py-2.5 rounded-lg text-sm bg-white/5 border border-white/10 text-white placeholder-white/25 outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors" />
      </div>
      <button type="button" onClick={fillAdmin}
        className="w-full py-2 rounded-lg text-xs font-medium border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 transition-colors">
        Preencher como Admin
      </button>
      {error && <p className="text-red-400 text-xs text-center">{error}</p>}
      <button type="submit" disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Entrar'}
      </button>
    </form>
  )
}

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1117] px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--color-accent)] mb-4">
            <Dog className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-white text-xl font-bold">Guia do Cão</h1>
          <p className="text-white/40 text-sm mt-1">Acesso restrito — Admin</p>
        </div>
        <Suspense fallback={<div className="h-40" />}>
          <LoginForm />
        </Suspense>
        <p className="text-white/20 text-xs text-center mt-6">Acesso restrito a administradores</p>
      </div>
    </div>
  )
}
