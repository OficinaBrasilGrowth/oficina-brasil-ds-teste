import type { ReactNode } from 'react'

export interface KpiCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: ReactNode
  iconColor?: 'blue' | 'green' | 'turquoise'
}

const iconBg: Record<NonNullable<KpiCardProps['iconColor']>, string> = {
  blue: '#18328A',
  green: '#90F252',
  turquoise: '#00B7A4',
}
// Text color inside the icon badge — must respect contrast-rules.ts.
// Verde background never pairs with white icon color.
const iconFg: Record<NonNullable<KpiCardProps['iconColor']>, string> = {
  blue: '#FFFFFF',
  green: '#00134E',
  turquoise: '#00134E',
}

export function KpiCard({ title, value, subtitle, icon, iconColor = 'green' }: KpiCardProps) {
  return (
    <div
      className="rounded-lg bg-card p-5"
      style={{ boxShadow: '0 1px 2px rgba(10,10,10,0.04), 0 4px 12px rgba(10,10,10,0.06)' }}
    >
      <p
        className="text-xs font-semibold uppercase m-0"
        style={{ color: 'var(--muted-foreground)', letterSpacing: '0.06em' }}
      >
        {title}
      </p>
      <div className="flex items-center justify-between mt-3">
        <p className="text-3xl font-bold m-0 tracking-tight" style={{ color: '#00134E' }}>{value}</p>
        {icon && (
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: iconBg[iconColor], color: iconFg[iconColor], opacity: 0.92 }}
          >
            {icon}
          </div>
        )}
      </div>
      {subtitle && <p className="text-xs mt-2 m-0" style={{ color: 'var(--muted-foreground)' }}>{subtitle}</p>}
    </div>
  )
}
