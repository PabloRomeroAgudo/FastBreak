import { Categoria } from '@/types'
import { Link } from '@inertiajs/react'

interface Props {
  categoria: Categoria
  someHasImage: boolean
}

export function CardCategoria({ categoria, someHasImage }: Props) {
  return (
    <Link
      href={`/categoria/${categoria.nombre}`}
      className='group flex flex-col gap-2 transition'
    >
      <div className='overflow-clip rounded-xl transition duration-300'>
        {someHasImage &&
          (categoria.imagen ? (
            categoria.imagen && (
              <img
                src={categoria.imagen}
                alt={`Imagen de la categoria ${categoria.nombre}`}
                className='aspect-square w-full transition-transform group-hover:scale-120'
              />
            )
          ) : (
            <div className='bg-muted aspect-square transition-transform group-hover:scale-120'></div>
          ))}
      </div>
      <h3 className='after:bg-negro group-hover:after:bg-amarillo group-hover:text-amarillo relative w-fit text-2xl font-bold transition-all group-hover:scale-110 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:transition-all after:ease-linear group-hover:after:scale-x-100'>
        {categoria.nombre}
      </h3>
      <p className='text-gris group-hover:text-negro text-pretty transition-colors'>{categoria.descripcion}</p>
    </Link>
  )
}
