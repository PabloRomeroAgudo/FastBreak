import { cn } from '@/lib/utils'
import { ChangeEvent, InputHTMLAttributes } from 'react'

export enum InputTypes {
  texto = 'text',
  numero = 'number',
}

interface OwnProps {
  titulo: string
  type?: InputTypes
  value: string | number | undefined
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
}

type Props = OwnProps & Omit<InputHTMLAttributes<HTMLInputElement>, keyof OwnProps>

export default function LabelInput({ titulo, type = InputTypes.texto, value, onChange, className = '', ...props }: Props) {
  return (
    <label className='flex flex-col'>
      {titulo}:
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={cn('bg-amarillo text-negro placeholder:text-negro rounded-md p-2', className)}
        {...props}
      />
    </label>
  )
}
