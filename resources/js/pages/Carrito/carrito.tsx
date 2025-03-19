import ElemCarrito from '@/components/carrito/elem-carrito'
import Pagar from '@/components/carrito/pagar'
import Precio from '@/components/carrito/precio'
import { CarritoContext } from '@/context/carrito'
import AppLayout from '@/layouts/app-layout'
import { SharedData } from '@/types'
import { Head, usePage } from '@inertiajs/react'
import { useContext } from 'react'
import { toast, Toaster } from 'sonner'

export default function Carrito() {
  const contexto = useContext(CarritoContext)
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider')
  }

  const { carrito } = contexto
  const { errors } = usePage<SharedData>().props
  Object.values(errors).forEach((error) => {
    toast.error(error)
  })
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
        <h3 className='text-rojo font-principal text-center text-4xl text-pretty'>¡Vaya, parece que aún no has pedido nada...!</h3>
      )}
      <Toaster richColors />
    </AppLayout>
  )
}
