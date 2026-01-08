// ===========================================
// Componente Input
// ===========================================
import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="space-y-1.5">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-arsenal-text-secondary"
          >
            {label}
          </label>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-2.5 bg-arsenal-bg border rounded-lg',
            'text-arsenal-text placeholder:text-arsenal-text-muted',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-arsenal-surface',
            'transition-all duration-200',
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

Input.displayName = 'Input'

export default Input
