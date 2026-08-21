import type { ReactNode } from 'react'

// NOTE: the original ob-ads AdminPageHeader had 8 color/gradient variants.
// The Oficina Brasil brand guide defines only 5 official colors — rather
// than inventing 3 extra ones to match the old count, this ships with 5
// variants (all approved pairings per contrast-rules.ts). Add more only if
// design provides additional approved brand colors.
export type AdminPageHeaderColor = 'azul' | 'azulEscuro' | 'verde' | 'turquesa' | 'azulClaro'

export interface AdminPageHeaderProps {
  color: AdminPageHeaderColor
  icon?: ReactNode
  title: string
  subtitle?: string
  actions?: ReactNode
}

const colorMap: Record<AdminPageHeaderColor, { bg: string; fg: string }> = {
  azul: { bg: '#18328A', fg: '#FFFFFF' },
  azulEscuro: { bg: '#00134E', fg: '#FFFFFF' },
  verde: { bg: '#90F252', fg: '#00134E' }, // never white text on verde — contrast-rules.ts
  turquesa: { bg: '#00B7A4', fg: '#00134E' },
  azulClaro: { bg: '#DAF7EF', fg: '#18328A' },
}

export function AdminPageHeader({ color, icon, title, subtitle, actions }: AdminPageHeaderProps) {
  const { bg, fg } = colorMap[color]
  return (
    <div
      className="rounded-lg px-6 py-5 flex items-center justify-between gap-4"
      style={{ backgroundColor: bg, color: fg, boxShadow: '0 1px 2px rgba(10,10,10,0.06), 0 4px 12px rgba(10,10,10,0.08)' }}
    >
      <div className="flex items-center gap-3.5">
        {icon && <span className="flex items-center justify-center">{icon}</span>}
        <div>
          <p className="text-xl font-bold m-0 tracking-tight">{title}</p>
          {subtitle && <p className="text-sm m-0 mt-0.5 opacity-85">{subtitle}</p>}
        </div>
      </div>
      {actions && <div>{actions}</div>}
    </div>
  )
}
