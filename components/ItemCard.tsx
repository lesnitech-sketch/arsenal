// ===========================================
// Componente ItemCard
// ===========================================
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Item } from '@/lib/types'
import { 
  cn, 
  copyToClipboard, 
  formatRelativeDate, 
  parseTags, 
  truncate,
  typeColors,
  typeIcons,
  typeLabels 
} from '@/lib/utils'
import Tag from './Tag'

interface ItemCardProps {
  item: Item
  onFavoriteToggle?: (id: string, favorite: boolean) => void
  onCopy?: (id: string) => void
}

export default function ItemCard({ item, onFavoriteToggle, onCopy }: ItemCardProps) {
  const [copied, setCopied] = useState(false)
  const [isFavorite, setIsFavorite] = useState(item.favorite)
  
  const tags = parseTags(item.tags)

  async function handleCopy(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    
    const success = await copyToClipboard(item.content)
    
    if (success) {
      setCopied(true)
      onCopy?.(item.id)
      
      // Registrar uso via API
      fetch(`/api/items/${item.id}/use`, { method: 'POST' })
      
      setTimeout(() => setCopied(false), 2000)
    }
  }

  async function handleFavorite(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    
    const newValue = !isFavorite
    setIsFavorite(newValue)
    onFavoriteToggle?.(item.id, newValue)
    
    // Atualizar via API
    fetch(`/api/items/${item.id}/favorite`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favorite: newValue }),
    })
  }

  return (
    <Link href={`/items/${item.id}`}>
      <article 
        className={cn(
          'group relative p-4 bg-arsenal-surface border border-arsenal-border rounded-xl',
          'hover:border-arsenal-accent/50 hover:bg-arsenal-hover',
          'transition-all duration-200 cursor-pointer'
        )}
      >
        {/* Header do Card */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            {/* Badge de Tipo */}
            <span 
              className={cn(
                'shrink-0 px-2 py-1 text-xs font-medium rounded-md border',
                typeColors[item.type]
              )}
            >
              {typeIcons[item.type]} {typeLabels[item.type]}
            </span>
          </div>

          {/* Ações */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* Botão Favoritar */}
            <button
              onClick={handleFavorite}
              className={cn(
                'p-1.5 rounded-md transition-colors',
                isFavorite 
                  ? 'text-yellow-400 hover:bg-yellow-500/20' 
                  : 'text-arsenal-text-muted hover:text-yellow-400 hover:bg-arsenal-bg'
              )}
              title={isFavorite ? 'Remover favorito' : 'Favoritar'}
            >
              {isFavorite ? '★' : '☆'}
            </button>

            {/* Botão Copiar */}
            <button
              onClick={handleCopy}
              className={cn(
                'p-1.5 rounded-md transition-colors',
                copied
                  ? 'text-green-400 bg-green-500/20'
                  : 'text-arsenal-text-muted hover:text-arsenal-text hover:bg-arsenal-bg'
              )}
              title="Copiar conteúdo"
            >
              {copied ? '✓' : '📋'}
            </button>
          </div>
        </div>

        {/* Título */}
        <h3 className="font-medium text-arsenal-text mb-1 line-clamp-1">
          {item.title}
        </h3>

        {/* Descrição */}
        {item.description && (
          <p className="text-sm text-arsenal-text-secondary mb-3 line-clamp-2">
            {truncate(item.description, 100)}
          </p>
        )}

        {/* Preview do Conteúdo */}
        <div className="mb-3">
          <pre className="p-2 bg-arsenal-bg rounded-md text-xs text-arsenal-text-muted font-mono line-clamp-2 overflow-hidden">
            {truncate(item.content, 150)}
          </pre>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Tags */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {tags.slice(0, 3).map((tag) => (
              <Tag key={tag} label={tag} size="sm" />
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-arsenal-text-muted">+{tags.length - 3}</span>
            )}
          </div>

          {/* Metadados */}
          <div className="flex items-center gap-3 text-xs text-arsenal-text-muted">
            {item.usageCount > 0 && (
              <span title="Vezes copiado">
                {item.usageCount}× usado
              </span>
            )}
            <span>{formatRelativeDate(item.createdAt)}</span>
          </div>
        </div>

        {/* Indicador de Favorito */}
        {isFavorite && (
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-t-yellow-500 border-l-[24px] border-l-transparent rounded-tr-xl" />
        )}
      </article>
    </Link>
  )
}
