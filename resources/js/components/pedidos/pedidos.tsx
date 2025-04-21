import { Pedido } from '@/types'
import ElemPedido from './elemPedido'

interface Props {
  pedidos: Pedido[]
}

export default function Pedidos({ pedidos }: Props) {
  return pedidos.length > 0 ? (
    <section className='grid gap-2'>
      {pedidos.map((pedido) => {
        return (
          <details className='bg-negro group p-3 text-white'>
            <summary className='font-principal text-3xl'>
              <span className='text-amarillo group-open:hidden'>Pedido {pedido.id}</span>
            </summary>

            <ElemPedido pedido={pedido} />
          </details>
        )
      })}
    </section>
  ) : (
    <h3 className='font-principal text-amarillo text-center text-4xl md:text-6xl'>No hay pedidos</h3>
  )
}
