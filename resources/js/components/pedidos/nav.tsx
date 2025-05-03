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
    <nav className='bg-negro text-blanco grid grid-cols-2 justify-items-center'>
      <Link
        prefetch='hover'
        as='h2'
        href={route('preparar')}
        className={`font-principal w-full cursor-pointer py-3 text-center text-3xl select-none ${isPrepararActive && 'bg-amarillo text-negro'}`}
      >
        {LinkValues.preparar}
      </Link>
      <Link
        prefetch='hover'
        as='h2'
        href={route('entregar')}
        className={`font-principal w-full cursor-pointer py-3 text-center text-3xl select-none ${!isPrepararActive && 'bg-amarillo text-negro'}`}
      >
        {LinkValues.entregar}
      </Link>
    </nav>
  )
}
