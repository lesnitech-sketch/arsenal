// ===========================================
// Componente SearchBar
// ===========================================
'use client'

import { useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { debounce } from '@/lib/utils'

interface SearchBarProps {
  placeholder?: string
  className?: string
}

export default function SearchBar({ 
  placeholder = 'Buscar itens...', 
  className = '' 
}: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('search') || '')

  // Debounce da busca para evitar muitas requisições
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      const params = new URLSearchParams(searchParams.toString())
      
      if (term) {
        params.set('search', term)
      } else {
        params.delete('search')
      }
      
      router.push(`/items?${params.toString()}`)
    }, 300),
    [searchParams, router]
  )

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value
    setValue(newValue)
    debouncedSearch(newValue)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setValue('')
      debouncedSearch('')
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* Ícone de Busca */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-arsenal-text-muted">
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 bg-arsenal-surface border border-arsenal-border rounded-lg
                   text-sm text-arsenal-text placeholder:text-arsenal-text-muted
                   focus:outline-none focus:ring-2 focus:ring-arsenal-accent/50 focus:border-arsenal-accent
                   transition-all duration-200"
      />

      {/* Atalho de Teclado */}
      {!value && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <kbd className="px-1.5 py-0.5 text-xs text-arsenal-text-muted bg-arsenal-bg border border-arsenal-border rounded">
            ⌘K
          </kbd>
        </div>
      )}

      {/* Botão Limpar */}
      {value && (
        <button
          onClick={() => {
            setValue('')
            debouncedSearch('')
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-arsenal-text-muted hover:text-arsenal-text transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
