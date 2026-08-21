import type { ReactNode } from 'react'

export interface ChartCardProps {
  title: string
  children: ReactNode
}

// Standard frame for any chart (Chart.js, Recharts, etc.) — the card only
// standardizes border, radius, and header; the chart itself stays whatever
// the consumer renders inside.
export function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div
      className="rounded-lg bg-card p-5"
      style={{ boxShadow: '0 1px 2px rgba(10,10,10,0.04), 0 4px 12px rgba(10,10,10,0.06)' }}
    >
      <p className="text-sm font-semibold m-0 mb-4" style={{ color: '#00134E' }}>{title}</p>
      {children}
    </div>
  )
}
