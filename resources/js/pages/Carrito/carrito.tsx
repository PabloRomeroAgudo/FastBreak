import ElemCarrito from '@/components/carrito/elem-carrito'
import Pagar from '@/components/carrito/pagar'
import Precio from '@/components/carrito/precio'
import { CarritoContext } from '@/context/carrito'
import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import { useContext } from 'react'

export default function Carrito() {
  const contexto = useContext(CarritoContext)
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider')
  }
  const { carrito } = contexto

  return (
    <AppLayout
      subtitulo={'Carrito'}
      needBack={true}
      url='/categoria'
    >
      <Head>
        <title>Carrito</title>
      </Head>

      {carrito.productos.map((item) => {
        return (
          <ElemCarrito
            producto={item}
            key={item.id}
          />
        )
      })}
      {carrito.productos.length > 0 ? (
        <>
          <Precio producto={carrito.precioTotal} />
          <Pagar />
        </>
      ) : (
        <h3 className='text-rojo font-principal self-center text-4xl'>¡Vaya, parece que aún no has pedido nada...!</h3>
      )}
    </AppLayout>
  )
}
