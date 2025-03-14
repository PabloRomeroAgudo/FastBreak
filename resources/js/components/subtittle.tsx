
import { Link } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'


export default function Subtittle({needBack ,titulo, pagAnterior }: {needBack:boolean, titulo: string , pagAnterior:string}) {

  return (

    <div className="relative flex bg-negro py-4 justify-center" >
      {
        needBack &&
        <Link className="cursor-pointer"href={pagAnterior}>
        <ArrowLeft 
        size={26}
        className='rounded-sm absolute left-4 hover:scale-125 hover:bg-blanco hover:text-black transition-all'/>
        </Link>
      }
      <h1 className="text-amarillo "  >{titulo}</h1>
    </div>
  )
}

