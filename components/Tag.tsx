// ===========================================
// Componente Tag
// ===========================================
import { cn } from '@/lib/utils'

interface TagProps {
  label: string
  size?: 'sm' | 'md'
  removable?: boolean
  onRemove?: () => void
  onClick?: () => void
  className?: string
}

export default function Tag({ 
  label, 
  size = 'md', 
  removable = false, 
  onRemove,
  onClick,
  className 
}: TagProps) {
  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1 bg-arsenal-bg border border-arsenal-border rounded-md',
        'text-arsenal-text-secondary font-mono',
        size === 'sm' ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-1 text-sm',
        onClick && 'cursor-pointer hover:bg-arsenal-hover hover:border-arsenal-accent/50',
        className
      )}
    >
      <span className="text-arsenal-text-muted">#</span>
      {label}
      
      {removable && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove?.()
          }}
          className="ml-0.5 text-arsenal-text-muted hover:text-red-400 transition-colors"
        >
          ×
        </button>
      )}
    </span>
  )
}
