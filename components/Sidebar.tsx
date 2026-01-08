// ===========================================
// Componente Sidebar
// ===========================================
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'

// Links da navegação
const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/items', label: 'Todos os Itens', icon: '📚' },
  { href: '/items/new', label: 'Novo Item', icon: '➕' },
]

// Filtros rápidos por tipo
const typeFilters = [
  { type: 'prompt', label: 'Prompts', icon: '💬' },
  { type: 'template', label: 'Templates', icon: '📄' },
  { type: 'snippet', label: 'Snippets', icon: '💻' },
  { type: 'tool', label: 'Ferramentas', icon: '🔧' },
  { type: 'checklist', label: 'Checklists', icon: '✅' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-arsenal-surface border-r border-arsenal-border flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-arsenal-border">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-arsenal-accent/20 rounded-xl flex items-center justify-center">
            <span className="text-xl">⚡</span>
          </div>
          <div>
            <h1 className="font-bold text-arsenal-text">Meu Arsenal</h1>
            <p className="text-xs text-arsenal-text-muted">Produtividade Dev</p>
          </div>
        </Link>
      </div>

      {/* Navegação Principal */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="mb-6">
          <p className="text-xs font-medium text-arsenal-text-muted uppercase tracking-wider mb-2 px-3">
            Menu
          </p>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                pathname === link.href
                  ? 'bg-arsenal-accent/20 text-arsenal-accent'
                  : 'text-arsenal-text-secondary hover:bg-arsenal-hover hover:text-arsenal-text'
              )}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Filtros por Tipo */}
        <div>
          <p className="text-xs font-medium text-arsenal-text-muted uppercase tracking-wider mb-2 px-3">
            Por Tipo
          </p>
          {typeFilters.map((filter) => (
            <Link
              key={filter.type}
              href={`/items?type=${filter.type}`}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200',
                pathname === '/items' && 
                typeof window !== 'undefined' && 
                new URLSearchParams(window.location.search).get('type') === filter.type
                  ? 'bg-arsenal-hover text-arsenal-text'
                  : 'text-arsenal-text-secondary hover:bg-arsenal-hover hover:text-arsenal-text'
              )}
            >
              <span>{filter.icon}</span>
              {filter.label}
            </Link>
          ))}
        </div>

        {/* Favoritos */}
        <div className="pt-4">
          <Link
            href="/items?favorite=true"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-arsenal-text-secondary hover:bg-arsenal-hover hover:text-arsenal-text transition-all duration-200"
          >
            <span>⭐</span>
            Favoritos
          </Link>
        </div>
      </nav>

      {/* Footer - Logout */}
      <div className="p-4 border-t border-arsenal-border">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-arsenal-text-secondary hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
        >
          <span>🚪</span>
          Sair
        </button>
      </div>
    </aside>
  )
}
