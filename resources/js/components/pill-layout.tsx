import { Deferred } from '@inertiajs/react'
import { LoaderCircle } from 'lucide-react'
import { ReactNode } from 'react'

interface Props {
  titulo: string
  data: string | string[]
  children: ReactNode
}

export default function PillLayout({ titulo, data, children }: Props) {
  return (
    <section className='bg-negro grid w-3/5 min-w-max gap-3 self-center rounded-2xl p-3 text-white'>
      <h3 className='text-center text-2xl'>{titulo}</h3>
      <Deferred
        fallback={<LoaderCircle className='size-10 animate-spin justify-self-center' />}
        data={data}
      >
        <ul className='grid grid-cols-[repeat(auto-fit,15rem)] justify-center gap-3'>{children}</ul>
      </Deferred>
    </section>
  )
}
