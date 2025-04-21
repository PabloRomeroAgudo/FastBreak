import { Pedido } from '@/types'
import { ArrowRight } from 'lucide-react'
import ElemPedido from './elemPedido'

interface Props {
  pedidos: Pedido[]
  isPrepare?: boolean
}

export default function Pedidos({ pedidos, isPrepare = false }: Props) {
  return pedidos.length > 0 ? (
    <section className='grid gap-2'>
      {pedidos.map((pedido) => {
        return (
          <details
            className='bg-negro group p-3 text-white'
            key={pedido.id}
          >
            <summary className='font-principal flex cursor-pointer list-none items-center gap-2 text-3xl'>
              <ArrowRight
                size={30}
                className='transition-transform duration-300 group-open:rotate-90'
              />
              <span className='text-amarillo group-open:scale-0'>Codigo: {pedido.codigo}</span>
            </summary>

            <ElemPedido
              pedido={pedido}
              isPrepare={isPrepare}
            />
          </details>
        )
      })}
    </section>
  ) : (
    <h3 className='font-principal text-amarillo text-center text-4xl md:text-6xl'>No hay pedidos</h3>
  )
}
