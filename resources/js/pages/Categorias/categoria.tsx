import CardProducto from '@/components/producto/cardProducto'
import CarouselCat from '@/components/producto/carouselCat'
import AppLayout from '@/layouts/app-layout'
import { type Categoria, type Producto } from '@/types'
import { Head } from '@inertiajs/react'
import { Toaster } from 'sonner'

interface Props {
  categoria: Categoria
  productos: Producto[]
  categorias: Categoria[]
}

export default function Categoria({ categoria, categorias, productos }: Props) {
  const areProducts = productos.length > 0

  return (
    <AppLayout
      subtitulo={categoria.nombre}
      needBack={true}
      url='/categoria'
    >
      <Head>
        <title>{categoria.nombre}</title>
      </Head>

      <section className='-mt-4 mb-4 flex justify-center px-4'>
        <CarouselCat
          categorias={categorias}
          categoriaActiva={categoria}
        />
      </section>

      {areProducts ? (
        <section className='grid grid-cols-[repeat(auto-fit,minmax(12rem,20rem))] justify-center gap-4 px-8'>
          {productos.map((producto) => {
            return (
              <CardProducto
                key={producto.id}
                producto={producto}
              />
            )
          })}
        </section>
      ) : (
        <h3 className='text-rojo font-principal self-center text-center text-4xl'>No hay productos de {categoria.nombre}</h3>
      )}

      <Toaster
        richColors
        duration={1500}
      />
    </AppLayout>
  )
}
