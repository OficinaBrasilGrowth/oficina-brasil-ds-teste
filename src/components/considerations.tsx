import type { ReactNode } from 'react'

export interface ConsiderationsProps {
  children: ReactNode
}

// Dark frame wrapping ConsiderationsContent cards — per the original
// ob-ads pattern (#14142A dark frame). Using Oficina Brasil's azulEscuro
// instead, since there's no equivalent dark neutral documented for this
// brand — azulEscuro is the closest approved dark background.
export function Considerations({ children }: ConsiderationsProps) {
  return (
    <div className="rounded-lg p-6" style={{ backgroundColor: '#00134E' }}>
      <div className="flex items-center gap-2 mb-4">
        <span
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
          style={{ backgroundColor: '#90F252', color: '#00134E' }}
        >
          ✎
        </span>
        <p className="font-bold m-0" style={{ color: '#FFFFFF' }}>Considerações</p>
      </div>
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        {children}
      </div>
    </div>
  )
}

export interface ConsiderationsContentProps {
  about: string
  children: ReactNode
  /** How many grid columns this card should span, mirroring the original `size` prop. */
  size?: 1 | 2
}

export function ConsiderationsContent({ about, children, size = 1 }: ConsiderationsContentProps) {
  return (
    <div
      className="rounded-lg p-4 bg-white"
      style={{ gridColumn: size === 2 ? 'span 2' : undefined, boxShadow: '0 1px 3px rgba(10,10,10,0.08)' }}
    >
      <p className="font-semibold m-0 mb-1" style={{ color: '#00134E' }}>{about}</p>
      <p className="text-sm m-0" style={{ color: 'var(--muted-foreground)' }}>{children}</p>
    </div>
  )
}
