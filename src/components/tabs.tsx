'use client'

import { useState, useRef, type ReactNode } from 'react'

// Interaction pattern referenced from Ant Design's Tabs (underline
// indicator sliding to the active tab, content panel below) — see
// Prompt 2, Step 1.5 — but keyboard behavior follows the WAI-ARIA
// Authoring Practices "tabs" pattern directly, not Ant's specific
// implementation: Left/Right arrows move focus AND activate the tab
// (automatic activation), Home/End jump to first/last tab. This was
// built with keyboard support from the start, not bolted on after —
// see the Modal/BrandSelect/DatePicker accessibility audit (Aug 2026)
// that found keyboard gaps added late are easy to miss.

export interface TabItem {
  key: string
  label: string
  content: ReactNode
}

export interface TabsProps {
  items: TabItem[]
  defaultKey?: string
}

export function Tabs({ items, defaultKey }: TabsProps) {
  const [active, setActive] = useState(defaultKey ?? items[0]?.key)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  function focusAndActivate(key: string) {
    setActive(key)
    tabRefs.current[key]?.focus()
  }

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      const next = items[(index + 1) % items.length]
      focusAndActivate(next.key)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      const prev = items[(index - 1 + items.length) % items.length]
      focusAndActivate(prev.key)
    } else if (e.key === 'Home') {
      e.preventDefault()
      focusAndActivate(items[0].key)
    } else if (e.key === 'End') {
      e.preventDefault()
      focusAndActivate(items[items.length - 1].key)
    }
  }

  const activeItem = items.find((i) => i.key === active)

  return (
    <div>
      <div role="tablist" aria-label="Tabs" className="flex gap-1 relative" style={{ borderBottom: '1px solid var(--border)' }}>
        {items.map((item, index) => {
          const isActive = item.key === active
          return (
            <button
              key={item.key}
              ref={(el) => { tabRefs.current[item.key] = el }}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${item.key}`}
              id={`tab-${item.key}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(item.key)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="px-4 py-2.5 text-sm font-medium relative transition-colors"
              style={{
                color: isActive ? '#18328A' : 'var(--muted-foreground)',
              }}
            >
              {item.label}
              {isActive && (
                <span
                  className="absolute left-0 right-0 -bottom-px"
                  style={{ height: 2, backgroundColor: '#18328A', borderRadius: 2 }}
                />
              )}
            </button>
          )
        })}
      </div>
      {activeItem && (
        <div
          role="tabpanel"
          id={`panel-${activeItem.key}`}
          aria-labelledby={`tab-${activeItem.key}`}
          tabIndex={0}
          className="pt-4"
        >
          {activeItem.content}
        </div>
      )}
    </div>
  )
}
