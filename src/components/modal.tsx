'use client'

import { useEffect, type ReactNode } from 'react'

// Interaction pattern referenced from Ant Design's Modal (centered card
// over a dark overlay, close button top-right, ESC to dismiss, click on
// overlay to dismiss) — see Prompt 2, Step 1.5. No Ant Design code or
// package is used; built from scratch with Oficina Brasil tokens.

export interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(10,10,10,0.4)' }}
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg p-7 max-w-md w-full mx-4 relative"
        style={{ boxShadow: '0 20px 25px rgba(10,10,10,0.1), 0 8px 10px rgba(10,10,10,0.08)' }}
      >
        <button
          type="button"
          aria-label="Fechar"
          onClick={onClose}
          className="absolute top-5 right-5 w-7 h-7 rounded-full flex items-center justify-center text-base transition-colors hover:bg-muted"
          style={{ color: 'var(--muted-foreground)' }}
        >
          ×
        </button>
        <p id="modal-title" className="text-lg font-bold m-0 mb-2.5 pr-8" style={{ color: '#00134E' }}>
          {title}
        </p>
        <div className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
