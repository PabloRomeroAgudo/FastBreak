import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'

interface Producto {
  nombre: string
  precio: number
  descripcion: string
  ingredientes: string
  alergenos: string
  imagen: string
}

interface Props {
  producto: Producto
}

export default function Show({ producto }: Props) {
  return (
    <>
      <Head>
        <title>{producto.nombre}</title>
      </Head>
      <AppLayout
        subtitulo='Producto'
        needBack={true}
      >
        <section className='container mx-auto px-4 py-10'>
          <div className='bg-blanco flex flex-col gap-8 rounded-lg p-6 shadow-lg md:flex-row'>
            <div className='flex-shrink-0 md:w-1/2'>
              {' '}
              {producto.imagen ? (
                <img
                  src={producto.imagen}
                  alt={`Imagen de ${producto.nombre}`}
                  className='h-auto w-full rounded-md object-cover'
                />
              ) : (
                <div className='flex h-64 w-full items-center justify-center rounded-md bg-gray-200 md:h-96'>
                  <span className='text-gray-500'>No hay imagen disponible</span>
                </div>
              )}
            </div>
            <div className='flex-grow'>
              {' '}
              <h1 className='text-negro mb-4 text-4xl font-bold'>{producto.nombre}</h1>
              <p className='mb-6 text-lg text-gray-800'>{producto.descripcion}</p>
              <p className='mb-6 text-lg text-gray-800'>{producto.ingredientes}</p>
              <p className='mb-6 text-lg text-gray-800'>{producto.alergenos}</p>
              <p className='text-rojo font-principal mb-6 text-3xl font-semibold'>{producto.precio}€</p>
            </div>
          </div>
        </section>
      </AppLayout>
    </>
  )
}
