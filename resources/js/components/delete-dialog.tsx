import { LoaderCircle, X } from 'lucide-react'

export enum TypeDelete {
  PRODUCTO = 'el producto',
  CATEGORIA = 'la categoría',
}

interface Props {
  nombre: string
  type: TypeDelete
  processing: boolean
  handleDelete: () => void
}

export default function DeleteDialog({ nombre, type, processing, handleDelete }: Props) {
  return (
    <dialog className='backdrop:bg-negro/70 absolute top-1/2 left-1/2 -translate-1/2 overflow-visible rounded-2xl'>
      <div className='border-amarillo bg-negro text-blanco grid gap-8 overflow-hidden rounded-2xl border p-8'>
        <button
          onClick={() => document.querySelector('dialog')?.close()}
          className='border-amarillo bg-negro hover:text-blanco absolute -top-2 -right-2 cursor-pointer rounded-full border text-gray-300 transition'
        >
          <X />
        </button>
        <h1 className='text-amarillo max-w-52 text-center'>
          ¿Seguro que quieres borrar {type} "{nombre}"?
        </h1>
        <button
          onClick={handleDelete}
          className='text-rojo/60 border-rojo/60 hover:text-rojo hover:border-rojo disabled:text-rojo/30 disabled:border-rojo/30 flex cursor-pointer items-center justify-center gap-1 self-end rounded-md border transition'
          disabled={processing}
        >
          {processing && <LoaderCircle className='h-4 w-4 animate-spin' />}
          {processing ? 'Borrando...' : 'Borrar'}
        </button>
      </div>
    </dialog>
  )
}
