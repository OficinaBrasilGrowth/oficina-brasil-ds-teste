'use client'

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { CheckIcon } from './icons'

// Interaction pattern referenced from Ant Design's message/notification
// (stacks in a fixed corner, auto-dismisses after a duration, closeable
// manually too) — see Prompt 2, Step 1.5. No Ant Design code or package
// is used.
//
// Accessibility: the toast region uses aria-live="polite" (role="status")
// so screen readers announce new toasts without interrupting whatever the
// user is doing — not aria-live="assertive", which would be too disruptive
// for routine confirmations. Error toasts still use the same polite
// region deliberately; a truly urgent, blocking error should use a Modal
// instead, not a toast a screen reader user could miss if focus is
// elsewhere.

export type ToastVariant = 'success' | 'error' | 'info'

interface ToastItem {
  id: string
  message: string
  variant: ToastVariant
}

interface ToastContextValue {
  show: (message: string, variant?: ToastVariant) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}

const variantStyles: Record<ToastVariant, { bg: string; fg: string }> = {
  success: { bg: '#00B7A4', fg: '#00134E' },
  error: { bg: '#D14343', fg: '#FFFFFF' },
  info: { bg: '#18328A', fg: '#FFFFFF' },
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const show = useCallback((message: string, variant: ToastVariant = 'info') => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, message, variant }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  function dismiss(id: string) {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2"
        style={{ maxWidth: 340 }}
      >
        {toasts.map((t) => {
          const s = variantStyles[t.variant]
          return (
            <div
              key={t.id}
              className="rounded-lg px-4 py-3 text-sm flex items-center gap-2.5"
              style={{
                backgroundColor: s.bg,
                color: s.fg,
                boxShadow: '0 4px 6px rgba(10,10,10,0.1), 0 10px 24px rgba(10,10,10,0.15)',
              }}
            >
              {t.variant === 'success' && <CheckIcon size={15} />}
              <span className="flex-1">{t.message}</span>
              <button
                type="button"
                aria-label="Fechar notificação"
                onClick={() => dismiss(t.id)}
                className="opacity-70 hover:opacity-100"
              >
                ×
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
