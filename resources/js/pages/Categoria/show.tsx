import CardProducto from '@/components/producto/cardProducto'
import CarouselCat from '@/components/producto/carouselCat'
import { useIsMobile } from '@/hooks/use-mobile'
import AppLayout from '@/layouts/app-layout'
import { Pagination, type Categoria } from '@/types'
import { Head, Link } from '@inertiajs/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Toaster } from 'sonner'

interface Props {
  categoria: Categoria
  paginacion: Pagination
  categorias: Categoria[]
}

export default function Categoria({ categoria, categorias, paginacion }: Props) {
  const isMobile = useIsMobile()

  const productos = paginacion.data

  const areProducts = productos.length > 0

  const someHasImage = productos.some((productos) => productos.imagen)

  return (
    <AppLayout
      subtitulo={categoria.nombre}
      needBack={true}
    >
      <Head>
        <title>{categoria.nombre}</title>
      </Head>

      <section className='-mt-4 flex justify-center px-4'>
        <CarouselCat
          categorias={categorias}
          categoriaActiva={categoria}
        />
      </section>

      {areProducts ? (
        <section className='grid gap-5 px-8'>
          <div className='grid grid-cols-[repeat(auto-fit,minmax(12rem,20rem))] justify-center gap-4'>
            {productos.map((producto) => {
              return (
                <CardProducto
                  key={producto.id}
                  producto={producto}
                  someHasImage={someHasImage}
                />
              )
            })}
          </div>

          <footer className={`text-negro flex w-1/2 max-w-5xl self-end justify-self-center ${isMobile && 'justify-between'}`}>
            <Link
              href={paginacion.prev_page_url}
              className={`hover:text-amarillo p-2 transition-all disabled:pointer-events-none ${!paginacion.prev_page_url && 'pointer-events-none text-gray-200'}`}
              title='Paginación previa'
              prefetch='mount'
            >
              <ArrowLeft />
            </Link>

            {!isMobile &&
              paginacion.links
                .filter((link) => !link.label.includes('&'))
                .map((link, idx) => {
                  return (
                    <Link
                      key={idx}
                      href={link.url}
                      prefetch={['click', 'hover']}
                      className={`font-principal mx-auto p-2 ${link.active && 'text-amarillo underline'}`}
                    >
                      {link.label}
                    </Link>
                  )
                })}

            <Link
              href={paginacion.next_page_url}
              className={`hover:text-amarillo p-2 transition-all disabled:pointer-events-none ${!paginacion.next_page_url && 'pointer-events-none text-gray-200'}`}
              title='Paginación próxima'
              prefetch='mount'
            >
              <ArrowRight />{' '}
            </Link>
          </footer>
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
