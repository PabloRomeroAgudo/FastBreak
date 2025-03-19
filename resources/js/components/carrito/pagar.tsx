import { CarritoContext } from '@/context/carrito'
import { Carrito } from '@/types'
import { router } from '@inertiajs/react'
import { useContext } from 'react'
import { toast } from 'sonner'

export default function Pagar() {
  const contexto = useContext(CarritoContext)
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider')
  }
  const { carrito, setCarrito } = contexto

  const pago = () => {
    router.post(
      route('pago'),
      { carrito },
      {
        onSuccess: () => {
          toast.success('Tu pedido se ha añadido correctamente')
          const nuevoCarrito: Carrito = {
            precioTotal: 0,
            productos: [],
          }
          setCarrito(nuevoCarrito)
        },
      },
    )
  }
  return (
    <button
      onClick={pago}
      className='font-principal bg-amarillo w-fit cursor-pointer self-center rounded-xl p-3 text-4xl text-black transition-transform hover:scale-110'
    >
      Pagar
    </button>
  )
}
