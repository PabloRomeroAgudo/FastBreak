import AppLayout from '@/layouts/app-layout'
import { transaccion } from '@/types'
import { Head } from '@inertiajs/react'
import { ArrowRight } from 'lucide-react'

interface Props {
  transacciones: transaccion[]
}

export default function MisPedidos({ transacciones }: Props) {
  console.log(transacciones)
  return (
    <AppLayout
      subtitulo='Mis Pedidos'
      needBack={true}
    >
      <Head>
        <title>Mis Pedidos</title>
      </Head>

      {transacciones.map((t, index) => (
        <details
          className='bg-negro group p-3 text-white open:pb-12'
          key={t.id}
        >
          <summary className='font-principal flex cursor-pointer list-none items-center gap-2 text-xl md:text-3xl'>
            <ArrowRight
              size={30}
              className='transition-transform duration-300 group-open:rotate-90'
            />

            <div className='grid grow grid-cols-3 items-center text-center transition-opacity group-open:opacity-0'>
              <h3>Pedido {index + 1}</h3>
              <span className='text-amarillo text-3xl md:text-5xl'>Código: {t.codigo}</span>
              <span>
                {t.fecha} {t.hora}
              </span>
              <span></span>
            </div>
          </summary>

          <article className='font-principal bg-negro text-blanco flex flex-col justify-between gap-4 text-xl opacity-0 transition-opacity group-open:opacity-100 md:flex-row md:px-4'>
            <span className='text-amarillo self-center text-center text-5xl'>Codigo: {t.codigo}</span>

            <div className='flex flex-col gap-2 self-center'>
              {t.productos.map((producto) => {
                return (
                  <label
                    key={`${producto.pivot.id_transaccion}-${producto.pivot.id_producto}`}
                    className='has-checked:text-blanco/70 relative flex cursor-pointer items-center gap-10 text-3xl has-checked:line-through'
                  >
                    <span className='w-60'>{producto.nombre}</span>
                    <span className='grow text-center'>{producto.pivot.cantidad}</span>
                  </label>
                )
              })}
            </div>
            <span>{t.total}€</span>
          </article>
        </details>
      ))}
    </AppLayout>
  )
}
