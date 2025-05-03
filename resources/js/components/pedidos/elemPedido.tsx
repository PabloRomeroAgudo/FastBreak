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
    <article className='font-principal bg-negro text-blanco flex flex-col justify-between gap-4 text-xl opacity-0 transition-opacity group-open:opacity-100 md:flex-row md:px-4'>
      <span className='text-amarillo self-center text-center text-5xl'>Codigo: {pedido.codigo}</span>

      <div className='flex flex-col gap-2 self-center'>
        {pedido.productos.map((producto) => {
          return (
            <label
              key={`${producto.pivot.id_transaccion}-${producto.pivot.id_producto}`}
              className='has-checked:text-blanco/70 relative flex cursor-pointer items-center gap-10 text-3xl has-checked:line-through'
            >
              <span className='w-60'>{producto.nombre}</span>
              <span className='grow text-center'>{producto.pivot.cantidad}</span>

              {isPrepare && (
                <input
                  type='checkbox'
                  className='peer pointer-events-none size-5'
                />
              )}
            </label>
          )
        })}
      </div>

      <button
        onClick={handleClick}
        className='bg-amarillo text-negro disabled:bg-amarillo/40 disabled:outline-amarillo/40 cursor-pointer self-center rounded-md p-3 px-6 text-2xl transition-all duration-300 hover:scale-110 disabled:pointer-events-none disabled:cursor-not-allowed md:p-6 md:text-4xl'
      >
        {buttonText}
      </button>
    </article>
  )
}
