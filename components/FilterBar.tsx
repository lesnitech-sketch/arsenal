// ===========================================
// Componente FilterBar
// ===========================================
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

const types = [
  { value: '', label: 'Todos', icon: '📚' },
  { value: 'prompt', label: 'Prompts', icon: '💬' },
  { value: 'template', label: 'Templates', icon: '📄' },
  { value: 'snippet', label: 'Snippets', icon: '💻' },
  { value: 'tool', label: 'Ferramentas', icon: '🔧' },
  { value: 'checklist', label: 'Checklists', icon: '✅' },
]

export default function FilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentType = searchParams.get('type') || ''

  function handleTypeChange(type: string) {
    const params = new URLSearchParams(searchParams.toString())
    
    if (type) {
      params.set('type', type)
    } else {
      params.delete('type')
    }
    
    router.push(`/items?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {types.map((type) => (
        <button
          key={type.value}
          onClick={() => handleTypeChange(type.value)}
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap',
            'transition-all duration-200',
            currentType === type.value
              ? 'bg-arsenal-accent/20 text-arsenal-accent border border-arsenal-accent/30'
              : 'bg-arsenal-surface text-arsenal-text-secondary border border-arsenal-border hover:border-arsenal-accent/30'
          )}
        >
          <span>{type.icon}</span>
          {type.label}
        </button>
      ))}
    </div>
  )
}
