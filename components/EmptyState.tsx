// ===========================================
// Componente EmptyState
// ===========================================
import Link from 'next/link'
import Button from './Button'

interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
}

export default function EmptyState({
  icon = '📭',
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-arsenal-text mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-arsenal-text-secondary text-center max-w-md mb-6">
          {description}
        </p>
      )}
      {actionLabel && (
        actionHref ? (
          <Link href={actionHref}>
            <Button>{actionLabel}</Button>
          </Link>
        ) : (
          <Button onClick={onAction}>{actionLabel}</Button>
        )
      )}
    </div>
  )
}
