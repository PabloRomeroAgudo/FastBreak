import { CarritoContext } from '@/context/carrito'
import { Carrito, ProductoCarrito } from '@/types'
import { useContext } from 'react'

interface Props {
  producto: ProductoCarrito
  esMovil: boolean
}

export default function InfoAndButton({ producto, esMovil }: Props) {
  const contexto = useContext(CarritoContext)
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider')
  }
  const { carrito, setCarrito } = contexto

  const eliminar = () => {
    const nuevosProductos = carrito.productos.filter((item) => item.id !== producto.id)
    let nuevoPrecio = 0

    nuevosProductos.forEach((Item) => (nuevoPrecio += Item.precio * Item.cantidad))

    const nuevoCarrito: Carrito = {
      productos: nuevosProductos,
      precioTotal: Number(nuevoPrecio.toFixed(2)),
    }
    setCarrito(nuevoCarrito)
  }

  return (
    <>
      <span className={`text-xl ${!esMovil && 'justify-self-center'}`}>
        Cantidad : <span className='text-blanco'> {producto.cantidad}</span>
      </span>
      <span className={`text-xl ${!esMovil && 'justify-self-center'}`}>
        Precio : <span className='text-blanco'>{producto.precio} €</span>
      </span>
      <button
        onClick={eliminar}
        className={`relative w-fit cursor-pointer text-xl font-bold text-red-600 transition-all after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-red-600 after:transition-all after:ease-linear hover:scale-110 hover:after:scale-x-100 ${!esMovil && 'justify-self-end'}`}
      >
        Eliminar
      </button>
    </>
  )
}
