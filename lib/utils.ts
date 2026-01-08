// ===========================================
// Utilitários Gerais
// ===========================================
import { clsx, type ClassValue } from 'clsx'

/**
 * Combina classes CSS com suporte a condicionais
 * Usa clsx para merge de classes
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/**
 * Formata data para exibição
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Formata data relativa (há X minutos, etc.)
 */
export function formatRelativeDate(date: Date | string): string {
  const d = new Date(date)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'agora'
  if (diffMins < 60) return `há ${diffMins}min`
  if (diffHours < 24) return `há ${diffHours}h`
  if (diffDays < 7) return `há ${diffDays}d`
  
  return formatDate(date)
}

/**
 * Trunca texto com ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}

/**
 * Parse de tags JSON para array
 */
export function parseTags(tags: string): string[] {
  try {
    return JSON.parse(tags)
  } catch {
    return []
  }
}

/**
 * Stringify de array para JSON
 */
export function stringifyTags(tags: string[]): string {
  return JSON.stringify(tags)
}

/**
 * Mapeia tipo para label amigável
 */
export const typeLabels: Record<string, string> = {
  prompt: 'Prompt',
  template: 'Template',
  snippet: 'Snippet',
  tool: 'Ferramenta',
  checklist: 'Checklist',
}

/**
 * Mapeia tipo para emoji/ícone
 */
export const typeIcons: Record<string, string> = {
  prompt: '💬',
  template: '📄',
  snippet: '💻',
  tool: '🔧',
  checklist: '✅',
}

/**
 * Cores por tipo
 */
export const typeColors: Record<string, string> = {
  prompt: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  template: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  snippet: 'bg-green-500/20 text-green-400 border-green-500/30',
  tool: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  checklist: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
}

/**
 * Copia texto para clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback para navegadores antigos
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    try {
      document.execCommand('copy')
      return true
    } catch {
      return false
    } finally {
      document.body.removeChild(textarea)
    }
  }
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
