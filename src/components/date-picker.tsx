'use client'

import { useState, useEffect } from 'react'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from './icons'

// Interaction pattern referenced from Ant Design's RangePicker (calendar
// grid with month navigation, range selection by clicking start then end,
// highlighted range between the two dates, Limpar/Aplicar action row) —
// see Prompt 2, Step 1.5. No Ant Design code or package is used; built
// from scratch with Oficina Brasil tokens. Month/day names in pt-BR,
// matching the original ob-ads component this replaces.

const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
]
const DIAS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

export interface DateRange {
  start: Date | null
  end: Date | null
}

export interface DatePickerProps {
  value: DateRange
  onChange: (range: DateRange) => void
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
function firstWeekday(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}
function isSameDay(a: Date | null, b: Date | null) {
  if (!a || !b) return false
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}
function isBetween(d: Date, a: Date | null, b: Date | null) {
  if (!a || !b) return false
  return d > a && d < b
}
function formatDate(d: Date | null) {
  if (!d) return '--/--/----'
  return d.toLocaleDateString('pt-BR')
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const [viewYear, setViewYear] = useState(value.start?.getFullYear() ?? new Date().getFullYear())
  const [viewMonth, setViewMonth] = useState(value.start?.getMonth() ?? new Date().getMonth())
  const [draft, setDraft] = useState<DateRange>(value)

  // Accessibility: Escape closes the popover, consistent with BrandSelect
  // and Modal. NOTE: full arrow-key navigation across the day grid (per
  // WAI-ARIA APG's grid pattern) is NOT implemented yet — flagged as a
  // follow-up, not silently skipped. Today only Tab reaches day buttons
  // in DOM order.
  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  function handleDayClick(day: number) {
    const clicked = new Date(viewYear, viewMonth, day)
    if (!draft.start || (draft.start && draft.end)) {
      setDraft({ start: clicked, end: null })
    } else if (clicked < draft.start) {
      setDraft({ start: clicked, end: draft.start })
    } else {
      setDraft({ start: draft.start, end: clicked })
    }
  }

  function changeMonth(delta: number) {
    let m = viewMonth + delta
    let y = viewYear
    if (m < 0) { m = 11; y -= 1 }
    if (m > 11) { m = 0; y += 1 }
    setViewMonth(m); setViewYear(y)
  }

  const totalDays = daysInMonth(viewYear, viewMonth)
  const startWeekday = firstWeekday(viewYear, viewMonth)
  const cells = [...Array(startWeekday).fill(null), ...Array.from({ length: totalDays }, (_, i) => i + 1)]

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="rounded-lg border px-3.5 py-2.5 text-sm flex items-center gap-2.5 transition-shadow"
        style={{ borderColor: 'var(--border)', boxShadow: open ? '0 0 0 3px rgba(24,50,138,0.12)' : 'none' }}
      >
        <CalendarIcon size={15} className="text-muted-foreground" />
        {value.start ? `${formatDate(value.start)} - ${formatDate(value.end)}` : 'Selecionar período'}
      </button>

      {open && (
        <div
          className="absolute z-10 mt-1.5 rounded-lg border bg-white p-4"
          style={{ borderColor: 'var(--border)', width: '300px', boxShadow: '0 4px 6px rgba(10,10,10,0.05), 0 10px 24px rgba(10,10,10,0.08)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <button type="button" onClick={() => changeMonth(-1)} aria-label="Mês anterior" style={{ color: '#18328A' }}><ChevronLeftIcon size={16} /></button>
            <p className="font-semibold m-0" style={{ color: '#00134E' }}>{MESES[viewMonth]} {viewYear}</p>
            <button type="button" onClick={() => changeMonth(1)} aria-label="Próximo mês" style={{ color: '#18328A' }}><ChevronRightIcon size={16} /></button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs mb-1">
            {DIAS.map((d) => (
              <span key={d} style={{ color: 'var(--muted-foreground)' }}>{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (day === null) return <span key={i} />
              const cellDate = new Date(viewYear, viewMonth, day)
              const isStart = isSameDay(cellDate, draft.start)
              const isEnd = isSameDay(cellDate, draft.end)
              const inRange = isBetween(cellDate, draft.start, draft.end)
              const bg = isStart || isEnd ? '#18328A' : inRange ? '#DAF7EF' : 'transparent'
              const fg = isStart || isEnd ? '#FFFFFF' : '#00134E'
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleDayClick(day)}
                  className="text-xs text-center rounded-lg py-1"
                  style={{ backgroundColor: bg, color: fg }}
                >
                  {day}
                </button>
              )
            })}
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setDraft({ start: null, end: null })}
              className="text-sm rounded-lg px-3.5 py-2 border"
              style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
            >
              Limpar
            </button>
            <button
              type="button"
              onClick={() => { onChange(draft); setOpen(false) }}
              className="text-sm rounded-lg px-3.5 py-2 font-medium"
              style={{ backgroundColor: '#18328A', color: '#FFFFFF', boxShadow: '0 1px 2px rgba(24,50,138,0.2)' }}
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
