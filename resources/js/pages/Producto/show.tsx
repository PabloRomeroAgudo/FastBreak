import { Buttons } from '@/components/producto/buttons'
import { CarritoContext } from '@/context/carrito'
import AppLayout from '@/layouts/app-layout'
import { goToUrlWithRedirect } from '@/lib/utils'
import { Carrito, Producto, SharedData } from '@/types'
import { Head, usePage } from '@inertiajs/react'
import { useContext, useState } from 'react'
import { toast, Toaster } from 'sonner'

interface Props {
  producto: Producto
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
  const { id, nombre, slug, descripcion, imagen, precio, ingredientes, alergenos } = producto

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
    <>
      <Head>
        <title>{nombre}</title>
      </Head>
      <AppLayout
        subtitulo={nombre}
        needBack={true}
      >
        <section className='bg-blanco mx-auto grid w-4/5 gap-8 rounded-lg px-4 py-10 shadow-xl md:grid-cols-[1fr_2px_1fr]'>
          <div className='aspect-square w-1/2 max-w-full self-center justify-self-center overflow-clip rounded-md md:h-full md:w-auto xl:w-2/3'>
            {imagen ? (
              <img
                src={imagen}
                alt={`Imagen de ${nombre}`}
                className='size-full object-contain'
              />
            ) : (
              <div className='bg-muted flex size-full items-center justify-center'></div>
            )}
          </div>

          <div className='h-full bg-gray-300'></div>

          <div className='flex flex-col gap-3'>
            <h3 className='text-negro font-principal text-center text-2xl font-bold text-pretty md:text-4xl'>{nombre}</h3>
            <p className='text-md text-pretty text-gray-800 md:text-lg'>{descripcion}</p>
            {ingredientes && (
              <div>
                <h4 className='font-principal text-center text-lg uppercase md:text-xl'>Ingredientes</h4>
                <p className='text-md text-gray-800 md:text-lg'>{ingredientes}</p>
              </div>
            )}
            {alergenos && (
              <div>
                <h4 className='font-principal text-center text-lg uppercase md:text-xl'>Alérgenos</h4>
                <p className='text-md text-gray-800 md:text-lg'>{alergenos}</p>
              </div>
            )}
            <p className='text-rojo font-principal text-3xl font-semibold'>{precio}€</p>
            <div className='mt-auto w-2/3 max-w-xl self-center'>
              <Buttons
                cantidad={cantidad}
                handleClickAddItem={handleClickAddItem}
                handleClickAddToCart={handleClickAddToCart}
              />
            </div>
          </div>
        </section>
        <Toaster richColors />
      </AppLayout>
    </>
  )
}
