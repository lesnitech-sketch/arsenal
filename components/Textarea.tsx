// ===========================================
// Componente Textarea
// ===========================================
import { cn } from '@/lib/utils'
import { TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="space-y-1.5">
        {label && (
          <label 
            htmlFor={textareaId}
            className="block text-sm font-medium text-arsenal-text-secondary"
          >
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full px-4 py-3 bg-arsenal-bg border rounded-lg',
            'text-arsenal-text placeholder:text-arsenal-text-muted',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-arsenal-surface',
            'transition-all duration-200 resize-y min-h-[120px]',
            'font-mono text-sm',
            error
              ? 'border-red-500 focus:ring-red-500/50'
              : 'border-arsenal-border focus:ring-arsenal-accent/50 focus:border-arsenal-accent',
            className
          )}
          {...props}
        />

        {hint && !error && (
          <p className="text-xs text-arsenal-text-muted">{hint}</p>
        )}

        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea
