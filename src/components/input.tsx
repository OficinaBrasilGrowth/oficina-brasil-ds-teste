import { forwardRef, type InputHTMLAttributes } from 'react'

// Error/helper text pattern referenced from Ant Design's Form.Item (red
// border + red helper text below on error, muted gray helper text when
// valid) — see Prompt 2, Step 1.5. No Ant Design code or package is used.

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { error, helperText, className, style, ...props },
  ref
) {
  return (
    <div>
      <input
        ref={ref}
        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm bg-background transition-shadow outline-none ${className ?? ''}`}
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
