import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'
import { ButtonHTMLAttributes } from 'react'

interface OwnProps {
  texto: string
  processing: boolean
  className?: string
}

type Props = OwnProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof OwnProps>

export default function SubmitButton({ texto, processing, className = '', ...props }: Props) {
  return (
    <button
      className={cn(
        'bg-amarillo disabled:bg-amarillo/40 text-negro flex cursor-pointer items-center gap-1 self-center rounded-sm px-6 py-1.5 disabled:cursor-not-allowed',
        className,
      )}
      type='submit'
      disabled={processing}
      {...props}
    >
      {processing && <LoaderCircle className='h-4 w-4 animate-spin' />}
      {texto}
    </button>
  )
}
