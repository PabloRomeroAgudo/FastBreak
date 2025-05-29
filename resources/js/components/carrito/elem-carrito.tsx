import { useIsMobile } from '@/hooks/use-mobile'
import { ProductoCarrito } from '@/types'
import { Link } from '@inertiajs/react'
import { ArrowRight } from 'lucide-react'
import InfoAndButton from './infoAndBoton'

interface Props {
  producto: ProductoCarrito
}

export default function ElemCarrito({ producto }: Props) {
  const esMovil = useIsMobile()

  return esMovil ? (
    <details className='text-amarillo font-principal bg-negro group gap-2.5 text-3xl'>
      <summary className='text-blanco flex cursor-pointer list-none items-center gap-2 p-5'>
        <ArrowRight
          size={30}
          className='transition-transform duration-300 group-open:rotate-90'
        />
        <Link
          href={route('producto.show', producto.slug)}
          className='hover:text-amarillo cursor-pointer underline transition-colors'
        >
          {producto.nombre}
        </Link>
      </summary>
      <div className='flex justify-between p-5 pt-0'>
        <InfoAndButton
          producto={producto}
          esMovil={esMovil}
        />
      </div>
    </details>
  ) : (
    <article className='text-amarillo font-principal bg-negro grid grid-cols-4 items-center gap-2.5 p-5 text-3xl'>
      <Link
        href={route('producto.show', producto.slug)}
        className='text-blanco hover:text-amarillo w-fit cursor-pointer transition-colors'
      >
        <h3>{producto.nombre}</h3>
      </Link>
      <InfoAndButton
        producto={producto}
        esMovil={esMovil}
      />
    </article>
  )
}
