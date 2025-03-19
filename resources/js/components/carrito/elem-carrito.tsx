import { CarritoContext } from '@/context/carrito'
import { Carrito, ProductoCarrito } from '@/types'
import { useContext } from 'react'

export default function ElemCarrito({ producto }: { producto: ProductoCarrito }) {
  const contexto = useContext(CarritoContext)
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider')
  }
  const { carrito, setCarrito } = contexto

  function eliminar() {
    const idDelete = producto.id
    const nuevosProductos = carrito.productos.filter((item) => item.id !== idDelete)

    let nuevoPrecio = 0
    nuevosProductos.forEach((Item) => (nuevoPrecio += Item.precio * Item.cantidad))
    const nuevoCarrito: Carrito = {
      productos: nuevosProductos,
      precioTotal: Number(nuevoPrecio.toFixed(2)),
    }

    setCarrito(nuevoCarrito)

    console.log(nuevoCarrito)
  }

  return (
    <article className='text-amarillo font-principal bg-negro grid grid-flow-col items-center gap-2.5 p-5 text-2xl md:text-3xl'>
      <h3 className='text-blanco w-24 md:w-48'>{producto.nombre}</h3>
      <span className='justify-self-center text-xl'>
        Cantidad : <span className='text-blanco'> {producto.cantidad}</span>
      </span>
      <span className='justify-self-center text-xl'>
        Precio : <span className='text-blanco'>{producto.precio} €</span>
      </span>
      <button
        onClick={eliminar}
        className='relative w-fit cursor-pointer justify-self-end text-xl font-bold text-red-600 transition-all after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-red-600 after:transition-all after:ease-linear hover:scale-110 hover:after:scale-x-100 md:text-2xl'
      >
        Eliminar
      </button>
    </article>
  )
}
