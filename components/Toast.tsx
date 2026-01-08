// ===========================================
// Componente Toast (Notificações)
// ===========================================
'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export interface Toast {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
}

interface ToastProps {
  toast: Toast
  onDismiss: (id: string) => void
}

function ToastItem({ toast, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id)
    }, 3000)

    return () => clearTimeout(timer)
  }, [toast.id, onDismiss])

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
  }

  const colors = {
    success: 'bg-green-500/10 border-green-500/30 text-green-400',
    error: 'bg-red-500/10 border-red-500/30 text-red-400',
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  }

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg border',
        'animate-slide-up shadow-lg backdrop-blur-sm',
        colors[toast.type]
      )}
    >
      <span className="text-lg">{icons[toast.type]}</span>
      <p className="text-sm font-medium">{toast.message}</p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="ml-auto opacity-60 hover:opacity-100 transition-opacity"
      >
        ×
      </button>
    </div>
  )
}

// Provider de Toasts (usar no layout)
interface ToastContainerProps {
  toasts: Toast[]
  onDismiss: (id: string) => void
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

// Hook para gerenciar toasts
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  function addToast(type: Toast['type'], message: string) {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, type, message }])
  }

  function dismissToast(id: string) {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return {
    toasts,
    addToast,
    dismissToast,
    success: (message: string) => addToast('success', message),
    error: (message: string) => addToast('error', message),
    info: (message: string) => addToast('info', message),
  }
}
