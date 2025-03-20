import { CarritoContext } from '@/context/carrito'
import { TitleValues } from '@/pages/Carrito/carrito'
import { Carrito, SharedData } from '@/types'
import { router, usePage } from '@inertiajs/react'
import { useContext } from 'react'
import { toast } from 'sonner'

interface Props {
  changeTitle: (newTitle: TitleValues) => void
}

export default function Pagar({ changeTitle }: Props) {
  const contexto = useContext(CarritoContext)
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider')
  }
  const { carrito, setCarrito } = contexto

  const { errors } = usePage<SharedData>().props

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
          changeTitle(TitleValues.success)
        },
        onError: () => {
          Object.values(errors).forEach((error) => {
            toast.error(error)
          })
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
