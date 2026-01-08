// ===========================================
// Página de Erro Global
// ===========================================
'use client'

import { useEffect } from 'react'
import { Button } from '@/components'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log do erro (pode integrar com serviço de monitoramento)
    console.error('Erro na aplicação:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-arsenal-bg flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-arsenal-text mb-2">
          Algo deu errado
        </h1>
        <p className="text-sm text-arsenal-text-secondary mb-6 max-w-md">
          Ocorreu um erro inesperado. Tente novamente ou volte ao início.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={reset}>
            Tentar novamente
          </Button>
          <Button variant="ghost" onClick={() => window.location.href = '/dashboard'}>
            Ir ao Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
