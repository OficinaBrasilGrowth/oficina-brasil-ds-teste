'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { ChevronDownIcon } from './icons'

// Interaction pattern referenced from Ant Design's Select (search field on
// top, filtered list below, clear button appears only when a value is set,
// active option highlighted) — see Prompt 2, Step 1.5. No Ant Design code
// or package is used; this is a from-scratch implementation styled with
// Oficina Brasil brand tokens.

export interface BrandSelectOption {
  label: string
  value: string
}

export interface BrandSelectProps {
  options: BrandSelectOption[]
  value: string | null
  onChange: (value: string | null) => void
  placeholder?: string
}

function normalize(text: string) {
  // Accent-insensitive search — the same category of bug that broke 11
  // components at once in a different project (see ob-ads NOTES.md) came
  // from raw non-ASCII characters in a normalize() regex. Using \u escapes
  // here deliberately, not the literal accented character.
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function BrandSelect({ options, value, onChange, placeholder }: BrandSelectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlighted, setHighlighted] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(() => {
    if (!query) return options
    const q = normalize(query)
    return options.filter((opt) => normalize(opt.label).includes(q))
  }, [options, query])

  const selectedLabel = options.find((opt) => opt.value === value)?.label

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setHighlighted(0)
  }, [query, open])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setOpen(false)
      setQuery('')
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlighted((h) => Math.max(h - 1, 0))
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      const opt = filtered[highlighted]
      if (opt) {
        onChange(opt.value)
        setOpen(false)
        setQuery('')
      }
    }
  }

  return (
    <div ref={containerRef} className="relative w-64">
      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o)
          setTimeout(() => inputRef.current?.focus(), 0)
        }}
        onKeyDown={handleKeyDown}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="w-full flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-sm bg-background transition-shadow"
        style={{ borderColor: 'var(--border)', boxShadow: open ? '0 0 0 3px rgba(24,50,138,0.12)' : 'none' }}
      >
        <span className={selectedLabel ? '' : 'text-muted-foreground'}>
          {selectedLabel ?? placeholder ?? 'Selecionar...'}
        </span>
        <div className="flex items-center gap-2">
          {value && (
            <span
              role="button"
              aria-label="Limpar seleção"
              onClick={(e) => {
                e.stopPropagation()
                onChange(null)
                setQuery('')
              }}
              className="text-muted-foreground hover:text-foreground text-xs px-1"
            >
              ×
            </span>
          )}
          <ChevronDownIcon size={14} className="text-muted-foreground" />
        </div>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute z-10 mt-1.5 w-full rounded-lg border bg-popover overflow-hidden"
          style={{ borderColor: 'var(--border)', boxShadow: '0 4px 6px rgba(10,10,10,0.05), 0 10px 24px rgba(10,10,10,0.08)' }}
        >
          <input
            ref={inputRef}
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar..."
            className="w-full px-3 py-2 text-sm border-b outline-none bg-transparent"
            style={{ borderColor: 'var(--border)' }}
          />
          <ul className="max-h-48 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-muted-foreground">Nenhum resultado</li>
            )}
            {filtered.map((opt, i) => (
              <li key={opt.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={opt.value === value}
                  onMouseEnter={() => setHighlighted(i)}
                  onClick={() => {
                    onChange(opt.value)
                    setOpen(false)
                    setQuery('')
                  }}
                  className="w-full text-left px-3 py-2 text-sm"
                  style={
                    opt.value === value
                      ? { backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)' }
                      : i === highlighted
                      ? { backgroundColor: 'var(--muted)' }
                      : undefined
                  }
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
