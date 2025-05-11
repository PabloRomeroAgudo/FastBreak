import { Link } from '@inertiajs/react'

export enum LinkValues {
  categoria = 'CATEGORIA',
  producto = 'PRODUCTO',
}

interface Props {
  active: LinkValues
}

export default function Nav({ active }: Props) {
  const isCategoriaActive = active === LinkValues.categoria

  return (
    <nav className='bg-negro text-blanco grid grid-cols-2 justify-items-center'>
      <Link
        prefetch='hover'
        as='h2'
        href={route('categoria.create')}
        className={`font-principal w-full cursor-pointer py-3 text-center text-3xl select-none ${isCategoriaActive && 'bg-amarillo text-negro'}`}
      >
        {LinkValues.categoria}
      </Link>
      <Link
        prefetch='hover'
        as='h2'
        href={route('producto.create')}
        className={`font-principal w-full cursor-pointer py-3 text-center text-3xl select-none ${!isCategoriaActive && 'bg-amarillo text-negro'}`}
      >
        {LinkValues.producto}
      </Link>
    </nav>
  )
}
