import { ReactNode } from 'react'

interface Props {
  titulo: string
  children: ReactNode
}

export default function PillLayout({ titulo, children }: Props) {
  return (
    <section className='bg-negro grid w-3/5 min-w-max gap-3 self-center rounded-2xl p-3 text-white'>
      <h3 className='text-center text-2xl'>{titulo}</h3>
      <ul className='grid grid-cols-[repeat(auto-fit,15rem)] justify-center gap-3'>{children}</ul>
    </section>
  )
}
