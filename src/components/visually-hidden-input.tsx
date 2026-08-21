import { InputHTMLAttributes, forwardRef } from 'react'

// Accessible hidden file input — visually invisible but reachable by
// screen readers and keyboard. Must be wrapped in a <label> or paired
// with a visible trigger button (e.g. FileUploadButton) so there's a
// clickable visible target; this component alone has no visual affordance
// by design.
export const VisuallyHiddenInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function VisuallyHiddenInput(props, ref) {
    return (
      <input
        ref={ref}
        {...props}
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      />
    )
  }
)
