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
      <h3 className='group-hover:text-amarillo w-full text-center text-2xl font-bold transition-all group-hover:scale-110 group-hover:underline'>
        {categoria.nombre}
      </h3>
      <p className='text-gris group-hover:text-negro text-pretty transition-colors'>{categoria.descripcion}</p>
    </Link>
  )
}
