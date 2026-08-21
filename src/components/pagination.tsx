'use client'

import { ChevronLeftIcon, ChevronRightIcon } from './icons'

// Interaction pattern referenced from Ant Design's Pagination (page-size
// selector on the left, current-range label, first/prev/next/last controls
// grouped on the right, disabled states for boundary pages) — see Prompt 2,
// Step 1.5. No Ant Design code or package is used; built from scratch with
// Oficina Brasil tokens.

export interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange?: (n: number) => void
  itemsPerPageOptions?: number[]
}

export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 25, 50],
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))
  const rangeStart = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
  const rangeEnd = Math.min(currentPage * itemsPerPage, totalItems)

  const atFirst = currentPage <= 1
  const atLast = currentPage >= totalPages

  function buttonStyle(disabled: boolean): React.CSSProperties {
    return {
      color: disabled ? 'var(--muted-foreground)' : '#18328A',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 text-sm flex-wrap">
      {onItemsPerPageChange && (
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="rounded-lg border px-3 py-1.5 bg-background text-sm"
          style={{ borderColor: 'var(--border)' }}
        >
          {itemsPerPageOptions.map((n) => (
            <option key={n} value={n}>{n} linhas</option>
          ))}
        </select>
      )}

      <span style={{ color: 'var(--muted-foreground)' }}>
        {rangeStart}-{rangeEnd} de {totalItems}
      </span>

      <div className="flex items-center gap-3">
        <button type="button" aria-label="Primeira página" disabled={atFirst} onClick={() => onPageChange(1)} style={buttonStyle(atFirst)} className="flex">
          <ChevronLeftIcon size={13} /><ChevronLeftIcon size={13} className="-ml-2" />
        </button>
        <button type="button" aria-label="Página anterior" disabled={atFirst} onClick={() => onPageChange(currentPage - 1)} style={buttonStyle(atFirst)} className="flex">
          <ChevronLeftIcon size={13} />
        </button>
        <span className="px-1 font-medium" style={{ color: '#00134E' }}>{currentPage} / {totalPages}</span>
        <button type="button" aria-label="Próxima página" disabled={atLast} onClick={() => onPageChange(currentPage + 1)} style={buttonStyle(atLast)} className="flex">
          <ChevronRightIcon size={13} />
        </button>
        <button type="button" aria-label="Última página" disabled={atLast} onClick={() => onPageChange(totalPages)} style={buttonStyle(atLast)} className="flex">
          <ChevronRightIcon size={13} /><ChevronRightIcon size={13} className="-ml-2" />
        </button>
      </div>
    </div>
  )
}
