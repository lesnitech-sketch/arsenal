// ===========================================
// Página 404 - Não Encontrado
// ===========================================
import Link from 'next/link'
import { Button } from '@/components'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-arsenal-bg flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-4xl font-bold text-arsenal-text mb-2">404</h1>
        <p className="text-xl text-arsenal-text-secondary mb-6">
          Página não encontrada
        </p>
        <p className="text-sm text-arsenal-text-muted mb-8 max-w-md">
          O recurso que você está procurando não existe ou foi movido.
        </p>
        <Link href="/dashboard">
          <Button>
            ← Voltar ao Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
