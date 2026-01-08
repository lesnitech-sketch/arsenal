// ===========================================
// Página de Login
// ===========================================
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Email ou senha inválidos')
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch {
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-arsenal-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-arsenal-accent/20 rounded-2xl mb-4">
            <span className="text-3xl">⚡</span>
          </div>
          <h1 className="text-2xl font-bold text-arsenal-text">Meu Arsenal</h1>
          <p className="text-arsenal-text-secondary mt-2">
            Sua biblioteca de produtividade
          </p>
        </div>

        {/* Card de Login */}
        <div className="bg-arsenal-surface border border-arsenal-border rounded-xl p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo Email */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-arsenal-text-secondary mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@arsenal.dev"
                required
                autoFocus
                className="w-full px-4 py-3 bg-arsenal-bg border border-arsenal-border rounded-lg 
                         text-arsenal-text placeholder:text-arsenal-text-muted
                         focus:outline-none focus:ring-2 focus:ring-arsenal-accent focus:border-transparent
                         transition-all duration-200"
              />
            </div>

            {/* Campo Senha */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-arsenal-text-secondary mb-2"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-arsenal-bg border border-arsenal-border rounded-lg 
                         text-arsenal-text placeholder:text-arsenal-text-muted
                         focus:outline-none focus:ring-2 focus:ring-arsenal-accent focus:border-transparent
                         transition-all duration-200"
              />
            </div>

            {/* Mensagem de Erro */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Botão de Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-arsenal-accent hover:bg-arsenal-accent-hover 
                       text-white font-medium rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-arsenal-accent focus:ring-offset-2 focus:ring-offset-arsenal-bg
                       transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle 
                      className="opacity-25" 
                      cx="12" cy="12" r="10" 
                      stroke="currentColor" 
                      strokeWidth="4" 
                      fill="none"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Entrando...
                </span>
              ) : (
                'Entrar'
              )}
            </button>
          </form>
        </div>

        {/* Credenciais padrão (apenas dev) */}
        <div className="mt-6 p-4 bg-arsenal-surface/50 border border-arsenal-border/50 rounded-lg">
          <p className="text-xs text-arsenal-text-muted text-center">
            <span className="text-arsenal-text-secondary font-medium">Credenciais padrão:</span>
            <br />
            admin@arsenal.dev / Arsenal@2024
          </p>
        </div>
      </div>
    </div>
  )
}
