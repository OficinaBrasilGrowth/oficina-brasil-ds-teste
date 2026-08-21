'use client'

import { useState } from 'react'

export type InfoTooltipVariant = 'solid' | 'ghost' | 'on-dark'
export type InfoTooltipAlign = 'left' | 'center' | 'right'

export interface InfoTooltipProps {
  message: string
  variant?: InfoTooltipVariant
  align?: InfoTooltipAlign
}

const variantStyles: Record<InfoTooltipVariant, { trigger: React.CSSProperties; bubble: React.CSSProperties }> = {
  solid: {
    trigger: { backgroundColor: '#18328A', color: '#FFFFFF' },
    bubble: { backgroundColor: '#0A0A0A', color: '#FFFFFF' },
  },
  ghost: {
    trigger: { backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' },
    bubble: { backgroundColor: '#0A0A0A', color: '#FFFFFF' },
  },
  'on-dark': {
    // Approved pairing: azulEscuro background needs branco/verde/azulClaro text — never raw white assumed without checking contrast-rules.ts
    trigger: { backgroundColor: '#00134E', color: '#FFFFFF' },
    bubble: { backgroundColor: '#FFFFFF', color: '#00134E' },
  },
}

const alignClass: Record<InfoTooltipAlign, string> = {
  left: 'left-0',
  center: 'left-1/2 -translate-x-1/2',
  right: 'right-0',
}

export function InfoTooltip({ message, variant = 'solid', align = 'center' }: InfoTooltipProps) {
  const [open, setOpen] = useState(false)
  const styles = variantStyles[variant]

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-label="Mais informações"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-shadow"
        style={{ ...styles.trigger, boxShadow: open ? '0 0 0 3px rgba(24,50,138,0.15)' : 'none' }}
      >
        i
      </button>
      {open && (
        <span
          role="tooltip"
          className={`absolute top-7 z-10 text-xs px-3 py-2 rounded-lg whitespace-nowrap ${alignClass[align]}`}
          style={{ ...styles.bubble, boxShadow: '0 4px 6px rgba(10,10,10,0.1), 0 10px 20px rgba(10,10,10,0.12)' }}
        >
          {message}
        </span>
      )}
    </span>
  )
}
