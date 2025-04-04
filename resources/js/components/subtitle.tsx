import { Link } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'

export default function Subtitle({ needBack = false, subtitulo, url = '' }: { needBack: boolean; subtitulo: string; url: string }) {
  return (
    <div className='bg-negro relative mb-4 flex items-center justify-center py-2'>
      {needBack &&
        (url ? (
          <Link
            className='absolute left-4 cursor-pointer'
            href={url}
          >
            <ArrowLeft
              size={26}
              className='text-blanco hover:bg-blanco rounded-sm transition-all hover:scale-125 hover:text-black'
            />
          </Link>
        ) : (
          <h1 className='font-principal text-red-600'>No has añadido el link</h1>
        ))}
      <h1 className='text-amarillo font-principal cursor-default text-3xl'>{subtitulo}</h1>
    </div>
  )
}
