'use client'

// Logo cutout graphic element — brand guide p. 55-56.
// "Nosso principal grafismo é derivado de recortes do nosso logo...
// A forma de aplicar é livre, mas é fundamental que se tenha cautela:
// use-o com moderação... O recorte do logo deve ser usado em combinação
// com as cores da nossa paleta, criando um efeito duotone."
//
// This is NOT the legible wordmark — it's the same letterforms scaled up
// dramatically and cropped tight, so only abstract fragments of letters
// are visible. The guide explicitly says application is free-form, so
// exact crop position is a creative choice, not a fixed spec.
//
// IMPORTANT: this uses the REAL extracted wordmark SVG as a CSS
// background-image (scaled up via background-size, cropped via
// background-position) — it does not redraw or approximate the letter
// shapes. Pick `wordmarkAsset` matching one of the real files in
// assets/logo/ (e.g. 'wordmark-azul.svg' or 'wordmark-verde.svg').

interface LogoCutoutProps {
  baseColor: string
  /** Path to the real extracted wordmark SVG, e.g. '/assets/logo/wordmark-azul.svg' */
  wordmarkAsset: string
  /** How zoomed-in the crop is, as a background-size percentage. Higher = more abstract. */
  zoomPercent?: number
  /** Where the crop is centered, as CSS background-position. */
  focalPoint?: string
  className?: string
}

export function LogoCutout({
  baseColor,
  wordmarkAsset,
  zoomPercent = 320,
  focalPoint = '65% 40%',
  className,
}: LogoCutoutProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg ${className ?? ''}`}
      style={{
        backgroundColor: baseColor,
        minHeight: '220px',
        backgroundImage: `url(${wordmarkAsset})`,
        backgroundSize: `${zoomPercent}%`,
        backgroundPosition: focalPoint,
        backgroundRepeat: 'no-repeat',
      }}
      role="img"
      aria-label="Elemento gráfico decorativo da marca Oficina Brasil"
    />
  )
}
