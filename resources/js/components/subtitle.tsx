import { Link } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'

export default function Subtitle({
  needBack = false,
  subtitulo,
  url = '',
}: {
  needBack?: boolean
  subtitulo: string
  url?: string
}) {
  return (
    
    <div className="bg-negro relative flex justify-center py-4">
      {needBack && (
        url ?(
        <Link className="cursor-pointer" href={url}>
          <ArrowLeft size={26} className="text-blanco hover:bg-blanco absolute left-4 rounded-sm transition-all hover:scale-125 hover:text-black" />
        </Link>
        

      ):<h2 className='text-red-600 font-principal'>No has añadido el link</h2>) 
          }
      <h2 className="text-amarillo font-principal">{subtitulo}</h2> 
    </div>
  )
}
