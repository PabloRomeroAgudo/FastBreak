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

      {transacciones.map((t, index) => {
        console.log(t.estado === 'entregado')
        return (
          <details
            className={`group p-3 text-white open:pb-12 ${t.estado === 'entregado' ? 'bg-gray-500' : 'bg-negro'}`}
            key={t.id}
          >
            <summary className='font-principal flex cursor-pointer list-none items-center gap-2 text-xl md:text-3xl'>
              <ArrowRight
                size={30}
                className='transition-transform duration-300 group-open:rotate-90'
              />

              <div className='grid grow grid-cols-3 items-center text-center transition-opacity group-open:opacity-0'>
                <h3>Pedido {index + 1}</h3>
                <span className={`text-3xl md:text-5xl ${t.estado === 'entregado' ? 'text-negro' : 'text-amarillo'} `}>Código: {t.codigo}</span>
                <span>
                  {t.fecha} {t.hora}
                </span>
              </div>
            </summary>

            <article className='font-principal text-blanco flex flex-col justify-between gap-4 text-xl opacity-0 transition-opacity group-open:opacity-100 md:px-4 lg:flex-row'>
              <span className={`self-center text-3xl md:text-5xl ${t.estado === 'entregado' ? 'text-negro' : 'text-amarillo'} `}>
                Codigo: {t.codigo}
              </span>
              <span className='self-center text-center text-3xl'>{t.estado}</span>
              <div className='flex flex-col gap-2 self-center'>
                {t.productos.map((producto) => {
                  return (
                    <label
                      key={`${producto.pivot.id_transaccion}-${producto.pivot.id_producto}`}
                      className='has-checked:text-blanco/70 relative flex cursor-pointer items-center gap-10 text-3xl has-checked:line-through'
                    >
                      <span className='w-60'>{producto.nombre}</span>
                      <span className='grow text-center'> {producto.pivot.cantidad} Uds</span>
                    </label>
                  )
                })}
              </div>
              <span className='self-center text-3xl'>
                Total: <span className='text-green-500'>{t.total}€</span>
              </span>
            </article>
          </details>
        )
      })}
    </AppLayout>
  )
}
