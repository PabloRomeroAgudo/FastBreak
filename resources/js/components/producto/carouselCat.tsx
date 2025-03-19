import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Categoria } from '@/types'
import { Link } from '@inertiajs/react'

interface Props {
  categorias: Categoria[]
  categoriaActiva: Categoria
}

export default function CarouselCat({ categorias, categoriaActiva }: Props) {
  const maxCategorias = categorias.length
  const anyHasImage = categorias.some((categoria) => categoria.imagen)

  let basis = 'basis-1/3 md:basis-1/4 lg:basis-1/6'
  if (maxCategorias <= 3) {
    basis = `basis-1/${maxCategorias}`
  } else if (maxCategorias <= 4) {
    basis = `basis-1/3 md:basis-1/${maxCategorias}`
  } else if (maxCategorias <= 6) {
    basis = `basis-1/4 md:basis-1/4 md:basis-1/${maxCategorias}`
  }

  return (
    <Carousel
      className='flex w-[80%] items-center justify-center select-none md:w-[60%]'
      opts={{ align: 'start' }}
    >
      <CarouselPrevious className='bg-amarillo text-blanco hover:text-blanco size-5 cursor-pointer border-0 hover:bg-yellow-500' />

      <CarouselContent className='py-2'>
        {categorias.map((categoria) => {
          const isActive = categoriaActiva.id === categoria.id
          return (
            <CarouselItem
              className={`${basis}`}
              key={categoria.id}
            >
              <Link
                title={categoria.nombre}
                href={`/categoria/${categoria.nombre}`}
                className='group flex w-fit max-w-20 flex-col items-center transition-all hover:scale-110'
              >
                <h4
                  className={`${isActive ? 'text-amarillo underline' : 'text-gris group-hover:text-negro'} max-w-full overflow-clip text-sm text-nowrap text-ellipsis`}
                >
                  {categoria.nombre}
                </h4>
                {anyHasImage &&
                  (categoria.imagen ? (
                    <img
                      src={categoria.imagen}
                      alt={`Foto de la categoria ${categoria.nombre}`}
                      className={`aspect-square h-10 rounded-xl object-cover`}
                    />
                  ) : (
                    <div className='bg-muted aspect-square h-10 rounded-xl'></div>
                  ))}
              </Link>
            </CarouselItem>
          )
        })}
      </CarouselContent>

      <CarouselNext className='bg-amarillo text-blanco hover:text-blanco size-5 cursor-pointer border-0 hover:bg-yellow-500' />
    </Carousel>
  )
}
