import { Categoria, SharedData } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import { Pencil } from 'lucide-react'
import './../../../css/hoverCardCategoria.css'

interface Props {
  categoria: Categoria
  someHasImage: boolean
}

export function CardCategoria({ categoria, someHasImage }: Props) {
  const { auth } = usePage<SharedData>().props

  return (
    <article className='group flex flex-col gap-2'>
      <div className='overflow-clip rounded-xl'>
        {someHasImage && (
          <Link href={route('categoria.show', categoria.slug)}>
            {categoria.imagen ? (
              categoria.imagen && (
                <img
                  src={categoria.imagen}
                  alt={`Imagen de la categoria ${categoria.nombre}`}
                  className='img aspect-square w-full object-contain transition-transform'
                />
              )
            ) : (
              <div className='bg-muted aspect-square transition-transform'></div>
            )}
          </Link>
        )}
      </div>
      <div className='flex items-center justify-items-start'>
        <Link
          href={route('categoria.show', categoria.slug)}
          className='text-2xl font-bold'
        >
          <h3 className='titulo transition-all'>{categoria.nombre}</h3>
        </Link>

        {auth.user && auth.user.esAdmin && (
          <Link
            href={route('categoria.edit', categoria.slug)}
            className='hover:text-amarillo ml-auto'
          >
            <Pencil />
          </Link>
        )}
      </div>
      <p className='text-gris group-hover:text-negro text-pretty transition-colors'>{categoria.descripcion}</p>
    </article>
  )
}
