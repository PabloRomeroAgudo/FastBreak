import { Pedido } from '@/types'

interface Props {
  pedido: Pedido
}

export default function ElemPedido({ pedido }: Props) {
  return (
    <article className='font-principal bg-negro text-blanco grid grid-cols-3 p-3 text-xl'>
      <span className='self-center'>Pedido-{pedido.id}</span>
      <div>
        {pedido.productos.map((producto) => {
          return (
            <div
              key={`${producto.pivot.id_transaccion}-${producto.pivot.id_producto}`}
              className='grid grid-cols-2 text-3xl'
            >
              <span>{producto.nombre}</span>
              <span>{producto.pivot.cantidad}</span>
            </div>
          )
        })}
      </div>
      <div className='grid justify-center gap-2 self-center text-3xl'>
        <span className='text-amarillo'>Codigo: {pedido.codigo}</span>
        <button className='bg-amarillo text-negro rounded-md'>Listo</button>
      </div>
    </article>
  )
}
