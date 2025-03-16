import { Carrito, Producto, SharedData } from '@/types'
import { Link, router, usePage } from '@inertiajs/react'
import { useState } from 'react'

interface Props {
  producto: Producto
  carrito: Carrito
  updateCarrito: (newcarrito: Carrito) => void
}

export default function CardProducto({ producto, carrito, updateCarrito }: Props) {
  const { auth } = usePage<SharedData>().props
  const { url } = usePage()
  const [cantidad, setCantidad] = useState(1)

  const { id, nombre, descripcion, imagen, precio } = producto

  const handleClickAddItem = (modifier: number) => {
    setCantidad((prevCantidad) => prevCantidad + modifier)
  }

  const handleClickAddToCart = () => {
    if (!auth.user) {
      router.get(route('login', { redirect: url }))
      return
    }

    const precioNuevoObjeto = cantidad * producto.precio

    const { precioTotal: precioAnt, productos } = carrito

    const isProductAlreadyAdded = productos.find((productoList) => productoList.id === producto.id)

    const newCarrito: Carrito = {
      precioTotal: Number((precioAnt + precioNuevoObjeto).toFixed(2)),
      productos: [...productos],
    }

    if (isProductAlreadyAdded) {
      newCarrito.productos = newCarrito.productos.map((p) => (p.id === producto.id ? { ...p, cantidad: p.cantidad + cantidad } : p))
    } else {
      newCarrito.productos.push({
        id,
        nombre,
        precio,
        descripcion,
        cantidad,
      })
    }

    updateCarrito(newCarrito)
    setCantidad(1)
  }

  return (
    <article
      className='flex flex-col gap-2'
      key={id}
    >
      {imagen && (
        <>
          <div className='relative overflow-clip rounded-xl transition duration-300'>
            <span className='font-principal text-blanco bg-rojo absolute right-0 grid aspect-square h-20 place-content-center rounded-full text-3xl'>
              {producto.precio}€
            </span>
            <img
              src={imagen}
              alt={`Imagen de la producto ${nombre}`}
            />
          </div>

          <div className='font-principal flex gap-1'>
            <button
              disabled={cantidad <= 1}
              onClick={() => handleClickAddItem(-1)}
              className='bg-amarillo text-md flex-1 cursor-pointer rounded-md transition-colors disabled:cursor-not-allowed disabled:bg-red-800'
            >
              -
            </button>
            <span className='flex-2 text-center'>{cantidad}</span>
            <button
              onClick={() => handleClickAddItem(1)}
              className='bg-amarillo text-md flex-1 cursor-pointer rounded-md'
            >
              +
            </button>
          </div>

          <button
            onClick={handleClickAddToCart}
            className='bg-amarillo font-principal flex-1 cursor-pointer rounded-3xl'
          >
            Añadir
          </button>
        </>
      )}

      <div className='flex items-center gap-4'>
        <Link
          href={`/producto/${nombre}`}
          className='after:bg-negro hover:after:bg-amarillo hover:text-amarillo relative w-fit text-2xl font-bold transition-all after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:transition-all after:ease-linear hover:scale-110 hover:after:scale-x-100'
        >
          <h3>{nombre}</h3>
        </Link>

        {/* PRECIO cuando no hay imagen */}
        {!imagen && (
          <span className='font-principal text-blanco bg-rojo grid aspect-square h-12 place-content-center rounded-full'>{producto.precio}€</span>
        )}
      </div>

      <p className='text-gris'>{descripcion}</p>

      {!imagen && (
        <>
          <div className='flex gap-1'>
            <button
              disabled={cantidad <= 1}
              onClick={() => setCantidad(cantidad - 1)}
              className='bg-amarillo font-principal text-md flex-1 cursor-pointer rounded-md transition-colors disabled:cursor-not-allowed disabled:bg-red-800'
            >
              -
            </button>
            <span className='font-principal flex-1 text-center'>{cantidad}</span>
            <button
              onClick={() => setCantidad(cantidad + 1)}
              className='bg-amarillo font-principal text-md flex-1 cursor-pointer rounded-md'
            >
              +
            </button>
          </div>

          <button
            className='bg-amarillo font-principal flex-1 cursor-pointer rounded-3xl'
            onClick={handleClickAddToCart}
          >
            Añadir
          </button>
        </>
      )}
    </article>
  )
}
