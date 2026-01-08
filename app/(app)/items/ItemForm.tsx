// ===========================================
// Formulário de Item (Criar/Editar)
// ===========================================
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input, Select, Textarea, Tag } from '@/components'
import { ItemType, Item } from '@/lib/types'
import { parseTags, stringifyTags } from '@/lib/utils'

const typeOptions = [
  { value: 'prompt', label: '💬 Prompt' },
  { value: 'template', label: '📄 Template' },
  { value: 'snippet', label: '💻 Snippet' },
  { value: 'tool', label: '🔧 Ferramenta' },
  { value: 'checklist', label: '✅ Checklist' },
]

const categoryOptions = [
  { value: 'Desenvolvimento', label: 'Desenvolvimento' },
  { value: 'Frontend', label: 'Frontend' },
  { value: 'Backend', label: 'Backend' },
  { value: 'DevOps', label: 'DevOps' },
  { value: 'Design', label: 'Design' },
  { value: 'Documentação', label: 'Documentação' },
  { value: 'Produtividade', label: 'Produtividade' },
  { value: 'Outro', label: 'Outro' },
]

const stackOptions = [
  { value: 'Geral', label: 'Geral' },
  { value: 'React', label: 'React' },
  { value: 'Next.js', label: 'Next.js' },
  { value: 'Vue', label: 'Vue' },
  { value: 'Node.js', label: 'Node.js' },
  { value: 'Python', label: 'Python' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'CSS', label: 'CSS' },
  { value: 'Docker', label: 'Docker' },
  { value: 'AWS', label: 'AWS' },
]

interface ItemFormProps {
  item?: Item
  defaultType?: ItemType
}

export default function ItemForm({ item, defaultType }: ItemFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Estado do formulário
  const [type, setType] = useState<ItemType>(item?.type as ItemType || defaultType || 'prompt')
  const [title, setTitle] = useState(item?.title || '')
  const [description, setDescription] = useState(item?.description || '')
  const [content, setContent] = useState(item?.content || '')
  const [tags, setTags] = useState<string[]>(item ? parseTags(item.tags) : [])
  const [tagInput, setTagInput] = useState('')
  const [category, setCategory] = useState(item?.category || '')
  const [stack, setStack] = useState(item?.stack || '')

  // Adicionar tag
  function addTag(tag: string) {
    const trimmed = tag.trim().toLowerCase()
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed])
    }
    setTagInput('')
  }

  // Remover tag
  function removeTag(tagToRemove: string) {
    setTags(tags.filter((t) => t !== tagToRemove))
  }

  // Handler do input de tags
  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(tagInput)
    } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
      removeTag(tags[tags.length - 1])
    }
  }

  // Submit do formulário
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const payload = {
        type,
        title,
        description: description || null,
        content,
        tags: stringifyTags(tags),
        category: category || null,
        stack: stack || null,
      }

      const url = item ? `/api/items/${item.id}` : '/api/items'
      const method = item ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Erro ao salvar item')
      }

      const savedItem = await res.json()
      router.push(`/items/${savedItem.id}`)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar item')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tipo */}
      <Select
        label="Tipo"
        value={type}
        onChange={(e) => setType(e.target.value as ItemType)}
        options={typeOptions}
        required
      />

      {/* Título */}
      <Input
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ex: Hook de autenticação com NextAuth"
        required
      />

      {/* Descrição */}
      <Input
        label="Descrição (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Breve descrição do item"
      />

      {/* Conteúdo */}
      <Textarea
        label="Conteúdo"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Cole o código, prompt ou texto aqui..."
        className="min-h-[200px]"
        required
      />

      {/* Tags */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-arsenal-text-secondary">
          Tags
        </label>
        <div className="flex flex-wrap items-center gap-2 p-3 bg-arsenal-bg border border-arsenal-border rounded-lg min-h-[46px]">
          {tags.map((tag) => (
            <Tag key={tag} label={tag} removable onRemove={() => removeTag(tag)} />
          ))}
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            onBlur={() => tagInput && addTag(tagInput)}
            placeholder={tags.length === 0 ? 'Digite tags e pressione Enter' : ''}
            className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-arsenal-text text-sm placeholder:text-arsenal-text-muted"
          />
        </div>
        <p className="text-xs text-arsenal-text-muted">
          Pressione Enter ou vírgula para adicionar uma tag
        </p>
      </div>

      {/* Categoria e Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={categoryOptions}
          placeholder="Selecione..."
        />
        <Select
          label="Stack"
          value={stack}
          onChange={(e) => setStack(e.target.value)}
          options={stackOptions}
          placeholder="Selecione..."
        />
      </div>

      {/* Erro */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Botões */}
      <div className="flex items-center gap-3 pt-4">
        <Button type="submit" loading={loading}>
          {item ? 'Salvar Alterações' : 'Criar Item'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
