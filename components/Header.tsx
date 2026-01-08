// ===========================================
// Componente Header
// ===========================================
'use client'

import { useSession } from 'next-auth/react'
import SearchBar from './SearchBar'

interface HeaderProps {
  title?: string
  subtitle?: string
  showSearch?: boolean
}

export default function Header({ 
  title, 
  subtitle, 
  showSearch = true 
}: HeaderProps) {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-10 bg-arsenal-bg/80 backdrop-blur-sm border-b border-arsenal-border">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Título da Página */}
        <div>
          {title && (
            <h1 className="text-xl font-semibold text-arsenal-text">{title}</h1>
          )}
          {subtitle && (
            <p className="text-sm text-arsenal-text-secondary mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Área Direita */}
        <div className="flex items-center gap-4">
          {/* Barra de Busca */}
          {showSearch && (
            <div className="w-80">
              <SearchBar />
            </div>
          )}

          {/* Avatar do Usuário */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-arsenal-accent/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-arsenal-accent">
                {session?.user?.name?.[0] || session?.user?.email?.[0]?.toUpperCase() || 'A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
