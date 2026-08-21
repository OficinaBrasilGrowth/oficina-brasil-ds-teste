import { forwardRef, type TextareaHTMLAttributes } from 'react'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  helperText?: string
}

// Same error/helper-text pattern as Input — kept consistent across every
// form field, not just visually similar by coincidence.
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { error, helperText, className, style, rows = 4, ...props },
  ref
) {
  return (
    <div>
      <textarea
        ref={ref}
        rows={rows}
        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm bg-background transition-shadow outline-none resize-y ${className ?? ''}`}
        style={{
          borderColor: error ? '#D14343' : 'var(--border)',
          ...style,
        }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = error
            ? '0 0 0 3px rgba(209,67,67,0.12)'
            : '0 0 0 3px rgba(24,50,138,0.12)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = 'none'
        }}
        aria-invalid={!!error}
        aria-describedby={error || helperText ? `${props.id}-message` : undefined}
        {...props}
      />
      {(error || helperText) && (
        <p
          id={`${props.id}-message`}
          className="text-xs mt-1.5 m-0"
          style={{ color: error ? '#D14343' : 'var(--muted-foreground)' }}
        >
          {error ?? helperText}
        </p>
      )}
    </div>
  )
})
