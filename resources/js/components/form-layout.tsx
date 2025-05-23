import { cn } from '@/lib/utils'
import { FormEvent, ReactNode } from 'react'

interface Props {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  children: ReactNode
  className?: string
}

export default function FormLayout({ handleSubmit, children, className = '', ...props }: Props) {
  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={cn('bg-negro text-blanco font-principal flex w-2/5 min-w-xs flex-col justify-center gap-8 rounded-xl p-10', className)}
      {...props}
    >
      {children}
    </form>
  )
}
