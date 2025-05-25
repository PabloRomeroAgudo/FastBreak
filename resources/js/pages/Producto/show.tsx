import { Buttons } from '@/components/producto/buttons'
import { CarritoContext } from '@/context/carrito'
import AppLayout from '@/layouts/app-layout'
import { goToUrlWithRedirect } from '@/lib/utils'
import { Carrito, Datum, SharedData } from '@/types'
import { Head, usePage } from '@inertiajs/react'
import { useContext, useState } from 'react'
import { toast, Toaster } from 'sonner'

interface Props {
  producto: Datum
}

export default function Show({ producto }: Props) {
  const contexto = useContext(CarritoContext)
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider')
  }
  const { carrito, setCarrito } = contexto
  const { auth } = usePage<SharedData>().props
  const { url } = usePage()
  const [cantidad, setCantidad] = useState(0)
  const { id, nombre, descripcion, imagen, precio } = producto

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
    <>
      <Head>
        <title>{nombre}</title>
      </Head>
      <AppLayout
        subtitulo={nombre}
        needBack={true}
      >
        <section className='container mx-auto px-4 py-10'>
          <div className='bg-blanco flex flex-col gap-8 rounded-lg p-6 shadow-lg md:flex-row'>
            <div className='flex-shrink-0 md:w-1/2'>
              {imagen ? (
                <img
                  src={imagen}
                  alt={`Imagen de ${producto.nombre}`}
                  className='h-auto w-full rounded-md object-cover'
                />
              ) : (
                <div className='bg-muted flex h-64 w-full items-center justify-center rounded-md md:h-96'>
                  <span className='text-gray-500'>No hay imagen disponible</span>
                </div>
              )}
            </div>
            <div className='flex-grow self-stretch'>
              <h1 className='text-negro mb-4 text-4xl font-bold'>{producto.nombre}</h1>
              <p className='mb-6 text-lg text-gray-800'>{producto.descripcion}</p>
              <p className='mb-6 text-lg text-gray-800'>Ingredientes: {producto.ingredientes}</p>
              <p className='mb-6 text-lg text-gray-800'>Alérgenos: {producto.alergenos}</p>
              <p className='text-rojo font-principal mb-6 text-3xl font-semibold'>{producto.precio}€</p>
              <Buttons
                cantidad={cantidad}
                handleClickAddItem={handleClickAddItem}
                handleClickAddToCart={handleClickAddToCart}
                className='mt-auto'
              />
            </div>
          </div>
        </section>
        <Toaster richColors />
      </AppLayout>
    </>
  )
}
