import ElemCarrito from '@/components/carrito/elem-carrito'
import Pagar from '@/components/carrito/pagar'
import Precio from '@/components/carrito/precio'
import { CarritoContext } from '@/context/carrito'
import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import { useContext, useState } from 'react'
import { Toaster } from 'sonner'

interface Props {
  redirect: string
}

export enum TitleValues {
  noOrder = '¡Vaya, parece que aún no has pedido nada...!',
  success = 'Tu pedido se ha añadido correctamente',
}

export default function Carrito({ redirect }: Props) {
  const [title, setTitle] = useState(TitleValues.noOrder)

  const hasBought = title !== TitleValues.noOrder

  const contexto = useContext(CarritoContext)
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider')
  }
  const { carrito } = contexto

  return (
    <AppLayout
      subtitulo={'Carrito'}
      needBack={true}
      url={redirect}
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
          <Pagar changeTitle={setTitle} />
        </>
      ) : (
        <h3
          className={
            hasBought ? 'font-principal text-center text-4xl text-pretty text-green-500' : 'text-rojo font-principal text-center text-4xl text-pretty'
          }
        >
          {title}
        </h3>
      )}
      <Toaster richColors />
    </AppLayout>
  )
}
