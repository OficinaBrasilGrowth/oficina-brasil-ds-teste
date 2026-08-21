'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

// Interaction pattern referenced from Ant Design's Dropdown (trigger +
// floating menu, closes on selection/outside click/Escape) — see Prompt 2,
// Step 1.5. No Ant Design code or package is used. Keyboard behavior
// follows the WAI-ARIA "menu button" pattern: ArrowDown/Up move a
// highlighted item, Enter/Space activates it, Escape closes and returns
// focus to the trigger — same rigor applied to BrandSelect and Modal in
// the Aug 2026 accessibility audit, applied here from the start.

export interface DropdownMenuItem {
  key: string
  label: string
  onSelect: () => void
  destructive?: boolean
}

export interface DropdownMenuProps {
  trigger: ReactNode
  items: DropdownMenuItem[]
}

export function DropdownMenu({ trigger, items }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<Record<number, HTMLButtonElement | null>>({})

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
    if (open) {
      setHighlighted(0)
      // Move focus into the menu so arrow keys work immediately.
      setTimeout(() => itemRefs.current[0]?.focus(), 0)
    }
  }, [open])

  function close(returnFocus = true) {
    setOpen(false)
    if (returnFocus) triggerRef.current?.focus()
  }

  function handleMenuKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault()
      close()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = (highlighted + 1) % items.length
      setHighlighted(next)
      itemRefs.current[next]?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = (highlighted - 1 + items.length) % items.length
      setHighlighted(prev)
      itemRefs.current[prev]?.focus()
    } else if (e.key === 'Tab') {
      // Menus shouldn't trap Tab like a modal — just close and let focus move naturally.
      close(false)
    }
  }

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {trigger}
      </button>

      {open && (
        <div
          role="menu"
          onKeyDown={handleMenuKeyDown}
          className="absolute z-10 mt-1.5 right-0 rounded-lg border bg-popover overflow-hidden py-1"
          style={{ borderColor: 'var(--border)', minWidth: 180, boxShadow: '0 4px 6px rgba(10,10,10,0.05), 0 10px 24px rgba(10,10,10,0.08)' }}
        >
          {items.map((item, i) => (
            <button
              key={item.key}
              ref={(el) => { itemRefs.current[i] = el }}
              role="menuitem"
              tabIndex={-1}
              onMouseEnter={() => setHighlighted(i)}
              onClick={() => {
                item.onSelect()
                close()
              }}
              className="w-full text-left px-3.5 py-2 text-sm"
              style={{
                color: item.destructive ? '#D14343' : '#00134E',
                backgroundColor: i === highlighted ? 'var(--muted)' : 'transparent',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
