'use client'

import { useRef, useState } from 'react'
import { VisuallyHiddenInput } from './visually-hidden-input'
import { UploadIcon, CheckIcon } from './icons'

// Interaction pattern referenced from Ant Design's Upload (button trigger
// + hidden input, validated file type/size before accepting, visual
// state change once a file is selected) — see Prompt 2, Step 1.5. No Ant
// Design code or package is used. Reuses VisuallyHiddenInput per the
// "extend, don't duplicate" rule from Prompt 2 — this was the exact
// component the original ob-ads FileUploadButton depended on.

export interface FileUploadButtonProps {
  onFileSelect: (file: File) => void
  accept?: string
  maxSizeMb?: number
  label?: string
}

export function FileUploadButton({
  onFileSelect,
  accept = 'image/*',
  maxSizeMb = 10,
  label = 'Adicionar imagem',
}: FileUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`Arquivo maior que ${maxSizeMb}MB`)
      setFileName(null)
      return
    }
    setError(null)
    setFileName(file.name)
    onFileSelect(file)
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="rounded-lg px-4 py-2.5 text-sm font-semibold flex items-center gap-2 w-fit transition-shadow"
        style={
          fileName
            ? { backgroundColor: '#00B7A4', color: '#00134E' }
            : { backgroundColor: '#18328A', color: '#FFFFFF', boxShadow: '0 1px 2px rgba(24,50,138,0.2)' }
        }
      >
        {fileName ? <CheckIcon size={14} /> : <UploadIcon size={15} />}
        {fileName ?? label}
      </button>
      {error && (
        <span className="text-xs" style={{ color: '#D14343' }}>{error}</span>
      )}
      <VisuallyHiddenInput
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
      />
    </div>
  )
}
