import { Pedido } from '@/types'

interface Props {
  pedido: Pedido
}

export default function ElemPedido({ pedido }: Props) {
  return (
    <article className='font-principal bg-negro text-blanco flex flex-col justify-between gap-4 text-xl md:flex-row md:px-4'>
      <span className='text-amarillo self-center'>Pedido {pedido.id}</span>

      <div className='flex flex-col gap-2 self-center'>
        {pedido.productos.map((producto) => {
          return (
            <div
              key={`${producto.pivot.id_transaccion}-${producto.pivot.id_producto}`}
              className='flex gap-10 text-3xl'
            >
              <span className='w-80'>{producto.nombre}</span>
              <span className='text-center'>{producto.pivot.cantidad}</span>
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
