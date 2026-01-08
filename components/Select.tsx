// ===========================================
// Componente Select
// ===========================================
import { cn } from '@/lib/utils'
import { SelectHTMLAttributes, forwardRef } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="space-y-1.5">
        {label && (
          <label 
            htmlFor={selectId}
            className="block text-sm font-medium text-arsenal-text-secondary"
          >
            {label}
          </label>
        )}
        
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full px-4 py-2.5 bg-arsenal-bg border rounded-lg',
            'text-arsenal-text',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-arsenal-surface',
            'transition-all duration-200 cursor-pointer',
            error
              ? 'border-red-500 focus:ring-red-500/50'
              : 'border-arsenal-border focus:ring-arsenal-accent/50 focus:border-arsenal-accent',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" className="text-arsenal-text-muted">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select
