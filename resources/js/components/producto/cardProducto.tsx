import { CarritoContext } from '@/context/carrito'
import { getPrice2Decimals, goToUrlWithRedirect } from '@/lib/utils'
import { Carrito, Datum, SharedData } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import { Pencil } from 'lucide-react'
import { useContext, useState } from 'react'
import { toast } from 'sonner'
import { Buttons } from './buttons'

interface Props {
  producto: Datum
  someHasImage: boolean
}

export default function CardProducto({ producto, someHasImage }: Props) {
  const contexto = useContext(CarritoContext)
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider')
  }

  const { carrito, setCarrito } = contexto

  const { auth } = usePage<SharedData>().props
  const { url } = usePage()
  const [cantidad, setCantidad] = useState(0)

  const { id, nombre, slug, descripcion, imagen, precio } = producto

  const handleClickAddItem = (modifier: number) => {
    setCantidad((prevCantidad) => prevCantidad + modifier)
  }

  const handleClickAddToCart = () => {
    if (!auth.user) {
      goToUrlWithRedirect('login', { redirect: url })
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
        slug,
        precio,
        descripcion,
        cantidad,
      })
    }

    setCarrito(newCarrito)
    setCantidad(0)

    toast.success('Añadido al carrito correctamente')
  }

  return (
    <article
      className='flex flex-col gap-2'
      key={id}
    >
      {someHasImage && (
        <>
          <div className='relative overflow-clip rounded-xl transition duration-300'>
            <span className='font-principal text-blanco bg-rojo absolute right-0 grid aspect-square h-14 place-content-center rounded-full text-lg lg:h-20 lg:text-3xl'>
              {getPrice2Decimals(producto.precio)}€
            </span>
            {imagen ? (
              <img
                src={imagen}
                alt={`Imagen de ${nombre}`}
                className='aspect-square w-full object-contain'
              />
            ) : (
              <div className='bg-muted aspect-square w-full object-contain'></div>
            )}
          </div>

          <Buttons
            cantidad={cantidad}
            handleClickAddItem={handleClickAddItem}
            handleClickAddToCart={handleClickAddToCart}
          />
        </>
      )}

      <div className='flex items-center gap-4'>
        <Link
          href={route('producto.show', slug)}
          className='hover:text-amarillo text-2xl font-bold transition-all hover:underline'
        >
          <h3>{nombre}</h3>
        </Link>

        {auth.user && auth.user.esAdmin && (
          <Link
            href={route('producto.edit', slug)}
            className='hover:text-amarillo ml-auto'
          >
            <Pencil />
          </Link>
        )}

        {/* PRECIO cuando no hay imagen */}
        {!someHasImage && (
          <span className='font-principal text-blanco bg-rojo grid aspect-square h-12 place-content-center rounded-full'>
            {getPrice2Decimals(producto.precio)}€
          </span>
        )}
      </div>

      <p className={`text-gris grow`}>{descripcion}</p>

      {!someHasImage && (
        <Buttons
          cantidad={cantidad}
          handleClickAddItem={handleClickAddItem}
          handleClickAddToCart={handleClickAddToCart}
        />
      )}
    </article>
  )
}
