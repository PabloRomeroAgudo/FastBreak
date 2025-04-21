import { Pedido } from '@/types'
import { router, useForm } from '@inertiajs/react'

interface Props {
  pedido: Pedido
  isPrepare?: boolean
}

export default function ElemPedido({ pedido, isPrepare }: Props) {
  const buttonText = isPrepare ? 'Listo' : 'Entregado'

  const { patch, data } = useForm({
    id: pedido.id,
  })

  const handleClick = () => {
    const url = isPrepare ? route('prepararAct', data.id) : route('entregarAct', data.id)

    patch(url, {
      onSuccess: () => {
        router.flush(route('entregar'))
        router.flush(route('preparar'))
      },
    })
  }

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

      <div className='grid justify-items-center gap-2 self-center text-3xl'>
        <span className='text-amarillo'>Codigo: {pedido.codigo}</span>
        <button
          onClick={handleClick}
          className='bg-amarillo text-negro disabled:bg-amarillo/40 disabled:outline-amarillo/40 cursor-pointer rounded-md p-2 transition-all duration-300 hover:scale-110 disabled:pointer-events-none'
        >
          {buttonText}
        </button>
      </div>
    </article>
  )
}
