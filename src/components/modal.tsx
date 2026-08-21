'use client'

import { useEffect, useRef, type ReactNode } from 'react'

// Interaction pattern referenced from Ant Design's Modal (centered card
// over a dark overlay, close button top-right, ESC to dismiss, click on
// overlay to dismiss) — see Prompt 2, Step 1.5. No Ant Design code or
// package is used; built from scratch with Oficina Brasil tokens.
//
// Accessibility fix (audit pass): the original version had no focus
// management — Tab could escape into the page behind the overlay, and
// focus wasn't returned to whatever triggered the modal after closing.
// Fixed by: trapping Tab/Shift+Tab within the dialog's focusable elements,
// moving focus into the dialog on open, and restoring focus to the
// previously focused element on close.

export interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return

    previouslyFocused.current = document.activeElement as HTMLElement | null

    const dialog = dialogRef.current
    const focusables = dialog?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    focusables?.[0]?.focus()

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialog) return

      const nodes = dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      if (nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('keydown', handleKey)
      previouslyFocused.current?.focus()
    }
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
        ref={dialogRef}
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
