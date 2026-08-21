// Shared icon components for the design system.
//
// CalendarIcon and CheckIcon use the exact path data from the real brand
// icon set (assets/icons/calendar.svg, check.svg) — not redrawn.
//
// ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, and UploadIcon are
// generic UI affordances with no equivalent in the 35-icon brand set —
// hand-drawn as simple, neutral glyphs (not brand assets, just standard
// interface iconography), sized to match stroke-based UI icon conventions.

interface IconProps {
  size?: number
  className?: string
  style?: React.CSSProperties
}

export function CalendarIcon({ size = 16, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 92.877 93.881" className={className} style={style} fill="currentColor" aria-hidden="true">
      <path d="M26.739 25.331a6.31 6.31 0 0 0 6.337-6.337V6.337C33.076 2.772 30.215 0 26.739 0s-6.337 2.861-6.337 6.337v12.568c0 3.565 2.771 6.426 6.337 6.426m39.368 0a6.31 6.31 0 0 0 6.337-6.337V6.337C72.444 2.772 69.583 0 66.107 0S59.77 2.861 59.77 6.337v12.568c0 3.565 2.771 6.426 6.337 6.426" />
      <path d="M85.881 12.673h-8.209v6.232c0 6.337-5.138 11.58-11.58 11.58s-11.58-5.243-11.58-11.58v-6.232H38.289v6.232c0 6.337-5.138 11.58-11.58 11.58s-11.58-5.243-11.58-11.58v-6.232H6.921A6.877 6.877 0 0 0 0 19.594V86.96c0 3.865 3.161 6.921 6.921 6.921h79.035a6.877 6.877 0 0 0 6.921-6.921V19.609c0-3.865-3.161-6.921-7.026-6.921zM32.282 72.924c0 1.378-1.183 2.577-2.577 2.577h-8.509c-1.378 0-2.577-1.183-2.577-2.577v-6.621c0-1.378 1.183-2.577 2.577-2.577h8.509a2.567 2.567 0 0 1 2.577 2.577zm0-19.1c0 1.378-1.183 2.577-2.577 2.577h-8.509a2.567 2.567 0 0 1-2.577-2.577v-6.621c0-1.378 1.183-2.577 2.577-2.577h8.509c1.378 0 2.577 1.183 2.577 2.577zm20.957 19.1c0 1.378-1.183 2.577-2.577 2.577h-8.509c-1.378 0-2.577-1.183-2.577-2.577v-6.621a2.567 2.567 0 0 1 2.577-2.577h8.509a2.567 2.567 0 0 1 2.577 2.577zm0-19.1c0 1.378-1.183 2.577-2.577 2.577h-8.509a2.567 2.567 0 0 1-2.577-2.577v-6.621a2.567 2.567 0 0 1 2.577-2.577h8.509c1.378 0 2.577 1.183 2.577 2.577zm20.883 19.1c0 1.378-1.183 2.577-2.577 2.577h-8.404c-1.378 0-2.577-1.183-2.577-2.577v-6.621c0-1.378 1.183-2.577 2.577-2.577h8.404a2.567 2.567 0 0 1 2.577 2.577zm0-19.1c0 1.378-1.183 2.577-2.577 2.577h-8.404a2.567 2.567 0 0 1-2.577-2.577v-6.621c0-1.378 1.183-2.577 2.577-2.577h8.404c1.378 0 2.577 1.183 2.577 2.577z" />
    </svg>
  )
}

export function CheckIcon({ size = 16, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 79.273 69.925" className={className} style={style} fill="currentColor" aria-hidden="true">
      <path d="M2.326 45.953c-3.101-3.101-3.101-8.134 0-11.235s8.134-3.101 11.25 0l15.25 15.25L65.078 3.08c2.682-3.46 7.655-4.105 11.115-1.423 3.461 2.681 4.105 7.655 1.423 11.115L36.211 66.326c-.3.449-.644.869-1.034 1.273-3.101 3.101-8.134 3.101-11.25 0L2.311 45.983z" />
    </svg>
  )
}

// Generic — not a brand asset.
export function ChevronDownIcon({ size = 14, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

// Generic — not a brand asset.
export function ChevronLeftIcon({ size = 14, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

// Generic — not a brand asset.
export function ChevronRightIcon({ size = 14, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

// Generic — not a brand asset.
export function UploadIcon({ size = 16, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M17 8l-5-5-5 5" />
      <path d="M12 3v12" />
    </svg>
  )
}
