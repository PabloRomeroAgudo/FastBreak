import { Link } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'

export default function Subtitle({ needBack = false, subtitulo, pagAnterior = "" }: { needBack: boolean; subtitulo: string; pagAnterior: string }) {
  return (
    <div className="bg-negro relative flex justify-center py-4">
      {needBack && (
        <Link className="cursor-pointer" href={pagAnterior}>
          <ArrowLeft size={26} className=" text-blanco hover:bg-blanco absolute left-4 rounded-sm transition-all hover:scale-125 hover:text-black" />
        </Link>
      )}
      <h1 className="text-amarillo">{subtitulo}</h1>
    </div>
  )
}
