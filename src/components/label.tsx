import type { LabelHTMLAttributes } from 'react'

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export function Label({ children, required, className, ...props }: LabelProps) {
  return (
    <label
      className={`text-sm font-medium block mb-1.5 ${className ?? ''}`}
      style={{ color: '#00134E' }}
      {...props}
    >
      {children}
      {required && (
        <span style={{ color: '#D14343' }} aria-hidden="true"> *</span>
      )}
    </label>
  )
}
