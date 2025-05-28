import AppLayout from '@/layouts/app-layout'
import { Transaccion } from '@/types'
import { Head } from '@inertiajs/react'
import { ArrowRight } from 'lucide-react'

interface Props {
  transacciones: Transaccion[]
}

export default function MisPedidos({ transacciones }: Props) {
  return (
    <AppLayout
      subtitulo='Mis Pedidos'
      needBack={true}
    >
      <Head>
        <title>Mis Pedidos</title>
      </Head>

      {transacciones.map((t, index) => {
        return (
          <details
            className={`group p-3 text-white open:pb-12 ${t.estado === 'entregado' ? 'bg-gray-500' : 'bg-negro'}`}
            key={t.id}
          >
            <summary className='font-principal flex cursor-pointer list-none items-center gap-2 text-lg sm:text-xl md:text-3xl'>
              <ArrowRight
                size={30}
                className='transition-transform duration-300 group-open:rotate-90'
              />

              <div className='grid grow grid-cols-3 items-center text-center transition-opacity group-open:opacity-0'>
                <h3>Pedido {index + 1}</h3>
                <span className={`text-xl sm:text-3xl md:text-5xl ${t.estado === 'entregado' ? 'text-negro' : 'text-amarillo'} `}>
                  Código: {t.codigo}
                </span>
                <span>
                  {t.fecha} {t.hora}
                </span>
              </div>
            </summary>

            <article className='font-principal text-blanco flex flex-col justify-between gap-4 text-xl opacity-0 transition-opacity group-open:opacity-100 md:px-4 lg:flex-row'>
              <span className={`self-center text-3xl text-nowrap sm:text-5xl ${t.estado === 'entregado' ? 'text-negro' : 'text-amarillo'}`}>
                Codigo: {t.codigo}
              </span>
              <span className='self-center text-center text-xl sm:text-3xl'>{t.estado}</span>
              <div className='flex flex-col gap-2 self-center'>
                {t.productos.map((producto) => {
                  return (
                    <label
                      key={`${producto.pivot.id_transaccion}-${producto.pivot.id_producto}`}
                      className={`relative grid grid-cols-[1fr_auto_auto] items-end gap-5 px-2 text-xl sm:text-3xl ${t.productos.length > 1 && 'border-b'}`}
                    >
                      <span className='w-full sm:w-60'>{producto.nombre}</span>
                      <span className='text-nowrap'> {producto.pivot.cantidad} Uds</span>
                      <span className='grow text-end'>{producto.precio}€</span>
                    </label>
                  )
                })}
              </div>
              <span className='flex flex-wrap justify-center gap-2 self-center text-xl sm:text-3xl'>
                Total:<span className='text-green-500'>{t.total}€</span>
              </span>
            </article>
          </details>
        )
      })}
    </AppLayout>
  )
}
