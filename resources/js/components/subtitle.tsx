import { router } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'

export default function Subtitle({ needBack = false, subtitulo, url }: { needBack: boolean; subtitulo: string; url: string }) {
  const goBack = () => {
    if (url) {
      router.get(route(url))
      return
    }

    if (window.history.length > 1) {
      window.history.back()
    } else {
      router.get(route('home'))
    }
  }

  return (
    <div className='bg-negro relative mb-4 flex items-center justify-center py-2'>
      {needBack && (
        <button
          className='absolute left-4 cursor-pointer'
          onClick={goBack}
        >
          <ArrowLeft
            size={26}
            className='text-blanco hover:bg-blanco rounded-sm transition-all hover:scale-125 hover:text-black'
          />
        </button>
      )}

      <h1 className='text-amarillo font-principal cursor-default text-3xl'>{subtitulo}</h1>
    </div>
  )
}
