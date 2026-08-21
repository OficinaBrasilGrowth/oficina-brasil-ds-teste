'use client'

import { useState } from 'react'
import { ChevronDownIcon } from './icons'

// Interaction pattern referenced from Ant Design's Table (column headers
// double as sort triggers with a directional indicator, hover highlight
// per row, dedicated empty state instead of a blank table, loading state
// replaces rows rather than hiding the header) — see Prompt 2, Step 1.5.
// No Ant Design code or package is used; built from scratch with Oficina
// Brasil tokens. Pairs with the existing Pagination component rather than
// bundling its own — a table shouldn't own pagination state.

export interface Column<T> {
  key: string
  header: string
  render?: (row: T) => React.ReactNode
  sortable?: boolean
  accessor?: (row: T) => string | number
}

export interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  rowKey: (row: T) => string
  loading?: boolean
  emptyMessage?: string
}

type SortDirection = 'asc' | 'desc' | null

export function DataTable<T>({ columns, data, rowKey, loading, emptyMessage = 'Nenhum resultado encontrado' }: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<SortDirection>(null)

  function handleSort(col: Column<T>) {
    if (!col.sortable) return
    if (sortKey !== col.key) {
      setSortKey(col.key)
      setSortDir('asc')
    } else if (sortDir === 'asc') {
      setSortDir('desc')
    } else {
      setSortKey(null)
      setSortDir(null)
    }
  }

  const sortedData = (() => {
    if (!sortKey || !sortDir) return data
    const col = columns.find((c) => c.key === sortKey)
    if (!col?.accessor) return data
    const copy = [...data]
    copy.sort((a, b) => {
      const av = col.accessor!(a)
      const bv = col.accessor!(b)
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ? 1 : -1
      return 0
    })
    return copy
  })()

  return (
    <div className="rounded-lg overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ backgroundColor: 'var(--muted)' }}>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col)}
                className="text-left px-4 py-3 font-semibold"
                style={{
                  color: 'var(--muted-foreground)',
                  cursor: col.sortable ? 'pointer' : 'default',
                  userSelect: 'none',
                }}
                aria-sort={
                  sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : col.sortable ? 'none' : undefined
                }
              >
                <span className="inline-flex items-center gap-1">
                  {col.header}
                  {col.sortable && (
                    <ChevronDownIcon
                      size={12}
                      className="transition-transform"
                      style={
                        sortKey === col.key
                          ? { transform: sortDir === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)', opacity: 1 }
                          : { opacity: 0.35 }
                      }
                    />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <tr key={`skeleton-${i}`} style={{ borderTop: '1px solid var(--border)' }}>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    <div className="h-4 rounded" style={{ backgroundColor: 'var(--muted)', width: '70%' }} />
                  </td>
                ))}
              </tr>
            ))}

          {!loading && sortedData.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center" style={{ color: 'var(--muted-foreground)' }}>
                {emptyMessage}
              </td>
            </tr>
          )}

          {!loading &&
            sortedData.map((row) => (
              <tr
                key={rowKey(row)}
                style={{ borderTop: '1px solid var(--border)' }}
                className="transition-colors hover:bg-muted"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3" style={{ color: '#00134E' }}>
                    {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
