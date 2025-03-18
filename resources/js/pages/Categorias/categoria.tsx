import CardProducto from '@/components/producto/cardProducto'
import { CarritoContext } from '@/context/carrito'
import AppLayout from '@/layouts/app-layout'
import { type Producto } from '@/types'
import { Head } from '@inertiajs/react'
import { useContext } from 'react'
import { Toaster } from 'sonner'

interface Props {
  categoria: string
  productos: Producto[]
}

export default function Categoria({ categoria, productos }: Props) {
  const { carrito } = useContext(CarritoContext)!

  return (
    <AppLayout
      subtitulo={categoria}
      needBack={true}
      url='/categoria'
    >
      <Head>
        <title>{categoria}</title>
      </Head>
      <section className='grid grid-cols-[repeat(auto-fit,minmax(12rem,20rem))] justify-center gap-4 px-8'>
        {productos &&
          productos.map((producto) => {
            return (
              <CardProducto
                key={producto.id}
                producto={producto}
              />
            )
          })}
      </section>

      <p>{carrito.precioTotal}</p>
      {carrito.productos.map((producto) => {
        return (
          <p>
            {producto.nombre} {producto.precio}€ {producto.cantidad}
          </p>
        )
      })}

      <Toaster
        richColors
        duration={1500}
      />
    </AppLayout>
  )
}
