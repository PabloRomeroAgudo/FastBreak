import { cn } from '@/lib/utils'
import { ChangeEvent, TextareaHTMLAttributes } from 'react'

interface OwnProps {
  titulo: string
  value: string | number | undefined
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
}

type Props = OwnProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, keyof OwnProps>

export default function LabelTextArea({ titulo, value, onChange, className = '', ...props }: Props) {
  return (
    <label className='flex flex-col'>
      {titulo}:
      <textarea
        value={value}
        onChange={onChange}
        className={cn('bg-amarillo text-negro field-sizing-content max-h-[calc(5lh_+_8px)] resize-none rounded-md p-2', className)}
        {...props}
      />
    </label>
  )
}
