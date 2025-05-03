import { useIsMobile } from '@/hooks/use-mobile'
import { ProductoCarrito } from '@/types'
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
        {producto.nombre}
      </summary>
      <div className='grid p-5 pt-0'>
        <InfoAndButton
          producto={producto}
          esMovil={esMovil}
        />
      </div>
    </details>
  ) : (
    <article className='text-amarillo font-principal bg-negro grid grid-flow-col items-center gap-2.5 p-5 text-3xl'>
      <h3 className='text-blanco w-48'>{producto.nombre}</h3>
      <InfoAndButton
        producto={producto}
        esMovil={esMovil}
      />
    </article>
  )
}
