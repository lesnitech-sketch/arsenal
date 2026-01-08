// ===========================================
// Componente - Detalhes do Item
// ===========================================
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Item } from '@/lib/types'
import { Button, Tag } from '@/components'
import ItemForm from '../ItemForm'
import { 
  cn, 
  copyToClipboard, 
  formatDate, 
  parseTags, 
  typeColors, 
  typeIcons, 
  typeLabels 
} from '@/lib/utils'

interface ItemDetailProps {
  item: Item
}

export default function ItemDetail({ item }: ItemDetailProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isFavorite, setIsFavorite] = useState(item.favorite)
  const [deleting, setDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const tags = parseTags(item.tags)

  // Copiar conteúdo
  async function handleCopy() {
    const success = await copyToClipboard(item.content)
    if (success) {
      setCopied(true)
      // Registrar uso
      fetch(`/api/items/${item.id}/use`, { method: 'POST' })
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Toggle favorito
  async function handleFavorite() {
    const newValue = !isFavorite
    setIsFavorite(newValue)

    await fetch(`/api/items/${item.id}/favorite`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favorite: newValue }),
    })

    router.refresh()
  }

  // Deletar item
  async function handleDelete() {
    setDeleting(true)

    try {
      const res = await fetch(`/api/items/${item.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        router.push('/items')
        router.refresh()
      }
    } catch (error) {
      console.error('Erro ao deletar:', error)
    } finally {
      setDeleting(false)
    }
  }

  // Modo edição
  if (isEditing) {
    return (
      <div className="max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-arsenal-text">Editar Item</h2>
          <Button variant="ghost" onClick={() => setIsEditing(false)}>
            Cancelar
          </Button>
        </div>
        <div className="bg-arsenal-surface border border-arsenal-border rounded-xl p-6">
          <ItemForm item={item} />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header com ações */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Badge de tipo */}
          <span 
            className={cn(
              'px-3 py-1.5 text-sm font-medium rounded-lg border',
              typeColors[item.type]
            )}
          >
            {typeIcons[item.type]} {typeLabels[item.type]}
          </span>

          {/* Favorito */}
          <button
            onClick={handleFavorite}
            className={cn(
              'p-2 rounded-lg transition-colors',
              isFavorite 
                ? 'text-yellow-400 bg-yellow-500/20' 
                : 'text-arsenal-text-muted hover:text-yellow-400 hover:bg-arsenal-hover'
            )}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-2">
          <Button onClick={handleCopy} variant="secondary">
            {copied ? '✓ Copiado!' : '📋 Copiar'}
          </Button>
          <Button onClick={() => setIsEditing(true)} variant="secondary">
            ✏️ Editar
          </Button>
          <Button 
            onClick={() => setShowDeleteConfirm(true)} 
            variant="danger"
          >
            🗑️
          </Button>
        </div>
      </div>

      {/* Descrição */}
      {item.description && (
        <p className="text-arsenal-text-secondary">{item.description}</p>
      )}

      {/* Conteúdo */}
      <div className="bg-arsenal-surface border border-arsenal-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-arsenal-border bg-arsenal-bg/50">
          <span className="text-xs text-arsenal-text-muted font-mono">Conteúdo</span>
          <button
            onClick={handleCopy}
            className="text-xs text-arsenal-text-muted hover:text-arsenal-text transition-colors"
          >
            {copied ? '✓' : 'Copiar'}
          </button>
        </div>
        <pre className="p-4 text-sm text-arsenal-text font-mono whitespace-pre-wrap overflow-x-auto">
          {item.content}
        </pre>
      </div>

      {/* Metadados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="p-4 bg-arsenal-surface border border-arsenal-border rounded-xl">
            <h3 className="text-sm font-medium text-arsenal-text-secondary mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          </div>
        )}

        {/* Informações */}
        <div className="p-4 bg-arsenal-surface border border-arsenal-border rounded-xl">
          <h3 className="text-sm font-medium text-arsenal-text-secondary mb-3">Informações</h3>
          <dl className="space-y-2 text-sm">
            {item.category && (
              <div className="flex justify-between">
                <dt className="text-arsenal-text-muted">Categoria</dt>
                <dd className="text-arsenal-text">{item.category}</dd>
              </div>
            )}
            {item.stack && (
              <div className="flex justify-between">
                <dt className="text-arsenal-text-muted">Stack</dt>
                <dd className="text-arsenal-text">{item.stack}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-arsenal-text-muted">Usos</dt>
              <dd className="text-arsenal-text">{item.usageCount}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-arsenal-text-muted">Criado em</dt>
              <dd className="text-arsenal-text">{formatDate(item.createdAt)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-arsenal-text-muted">Atualizado em</dt>
              <dd className="text-arsenal-text">{formatDate(item.updatedAt)}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Modal de confirmação de exclusão */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-arsenal-surface border border-arsenal-border rounded-xl p-6 max-w-md w-full mx-4 animate-slide-up">
            <h3 className="text-lg font-semibold text-arsenal-text mb-2">
              Excluir item?
            </h3>
            <p className="text-sm text-arsenal-text-secondary mb-6">
              Tem certeza que deseja excluir &ldquo;{item.title}&rdquo;? 
              Esta ação não pode ser desfeita.
            </p>
            <div className="flex items-center justify-end gap-3">
              <Button 
                variant="ghost" 
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancelar
              </Button>
              <Button 
                variant="danger" 
                onClick={handleDelete}
                loading={deleting}
              >
                Excluir
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Link voltar */}
      <div className="pt-4">
        <Link 
          href="/items" 
          className="text-sm text-arsenal-text-muted hover:text-arsenal-text transition-colors"
        >
          ← Voltar para lista
        </Link>
      </div>
    </div>
  )
}
