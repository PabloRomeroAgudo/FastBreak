import { Link } from '@inertiajs/react'

export enum LinkValues {
  preparar = 'PREPARAR',
  entregar = 'ENTREGAR',
}

interface Props {
  active: LinkValues
}

export default function Nav({ active }: Props) {
  const isPrepararActive = active === LinkValues.preparar

  return (
    <nav className='bg-negro text-blanco mb-5 grid grid-cols-2 justify-items-center py-3'>
      <Link
        as='h2'
        href={route('preparar')}
        className={`font-principal text-2xl ${isPrepararActive && 'text-amarillo'}`}
      >
        {LinkValues.preparar}
      </Link>
      <Link
        as='h2'
        href={route('entregar')}
        className={`font-principal text-2xl ${!isPrepararActive && 'text-amarillo'}`}
      >
        {LinkValues.entregar}
      </Link>
    </nav>
  )
}
