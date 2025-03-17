import CardProducto from '@/components/producto/cardProducto'
import AppLayout from '@/layouts/app-layout'
import { type Producto } from '@/types'
import { Head } from '@inertiajs/react'

interface Props {
  categoria: string
  productos: Producto[]
}

export default function Categoria({ categoria, productos }: Props) {
  // const contexto = useContext(CarritoContext)

  // if (!contexto) {
  //   throw new Error('useCarrito debe usarse dentro de un CarritoProvider')
  // }
  // const { carrito } = contexto

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
            return <CardProducto producto={producto} />
          })}
      </section>

      {/* Mostrar carrito */}
      {/* <p>{carrito.precioTotal}</p>
      {carrito.productos.map((producto) => {
        return (
          <p key={producto.id}>
            {producto.nombre} {producto.precio}€ {producto.cantidad}
          </p>
        )
      })} */}
    </AppLayout>
  )
}
