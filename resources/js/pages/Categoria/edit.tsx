import AppLayout from '@/layouts/app-layout'
import { Categoria } from '@/types'
import { Head, useForm } from '@inertiajs/react'
import { LoaderCircle, Trash, X } from 'lucide-react'
import { ChangeEvent, FormEventHandler, useRef, useState } from 'react'
import { toast, Toaster } from 'sonner'

interface Props {
  categoria: Categoria
}

export default function Edit({ categoria }: Props) {
  const { nombre, descripcion, imagen } = categoria

  const { data, setData, post, processing } = useForm({
    nombre,
    descripcion,
    imagen: null as File | null,
    borrarImagen: false as boolean,
  })
  const { delete: destroy, processing: processingBorrado } = useForm({})

  const inputRef = useRef<HTMLInputElement>(null)

  const [url, setUrl] = useState(imagen)

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('categoria.update', { id: categoria.id, ...data, _method: 'PUT' }), {
      onError: (errors) => Object.values(errors).forEach((error) => toast.error(error)),
      onSuccess: () => toast.success('Categoria editada correctamente.'),
    })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('change')
    const file = e.target.files?.[0] ?? null
    setData('imagen', file)
    setUrl(file ? URL.createObjectURL(file) : null)
  }

  const handleDelete = () => {
    destroy(route('categoria.destroy', categoria.id))
  }

  return (
    <AppLayout
      subtitulo={`Editar categoria "${nombre}"`}
      needBack={true}
      url='home'
    >
      <Head>
        <title>{`Editar categoria "${nombre}"`}</title>
      </Head>

      <div className='flex flex-col items-center gap-2'>
        <form
          onSubmit={handleSubmit}
          className='bg-negro font-principal flex w-2/5 min-w-xs flex-col justify-center gap-8 rounded-xl p-10'
        >
          <label className='text-blanco flex flex-col'>
            Nombre:
            <input
              type='text'
              value={data.nombre}
              onChange={(e) => setData('nombre', e.target.value)}
              className='bg-amarillo text-negro placeholder:text-negro rounded-md p-2'
            />
          </label>

          <label className='text-blanco flex flex-col'>
            Descripción:
            <textarea
              value={data.descripcion}
              onChange={(e) => setData('descripcion', e.target.value)}
              className='bg-amarillo text-negro placeholder:text-negro font-body field-sizing-content max-h-[calc(5lh_+_8px)] rounded-md p-2'
            />
          </label>

          <div className='grid justify-items-center gap-2 self-center'>
            <div className='relative size-56 overflow-hidden rounded-2xl'>
              <input
                className='absolute inset-0 z-10 size-full cursor-pointer text-transparent file:hidden'
                ref={inputRef}
                type='file'
                accept='.jpg, .jpeg, .png, .webp'
                onChange={handleFileChange}
              />
              {url && (
                <img
                  src={url}
                  alt={`Imagen de la categoria ${nombre}`}
                  className='aspect-square w-full object-contain'
                />
              )}

              <div className='bg-blanco/40 absolute inset-0 grid size-full place-items-center rounded-sm p-2'>
                <span>{url ? `Toca para cambiar` : `Toca para añadir`}</span>
              </div>
            </div>

            <div
              title='Eliminar imagen seleccionada'
              className='text-rojo cursor-pointer p-2'
            >
              <Trash
                onClick={() => {
                  setData('borrarImagen', true)
                  setUrl(null)
                  if (inputRef.current) {
                    inputRef.current.value = ''
                  }
                }}
              />
            </div>
          </div>

          <button
            className='bg-amarillo disabled:bg-amarillo/40 flex cursor-pointer items-center gap-1 self-center rounded-sm px-6 py-1.5 disabled:cursor-not-allowed'
            type='submit'
            disabled={processing}
          >
            {processing && <LoaderCircle className='h-4 w-4 animate-spin' />}
            Guardar
          </button>
        </form>

        <button
          className='bg-negro text-rojo cursor-pointer rounded-md p-2'
          onClick={() => document.querySelector('dialog')?.showModal()}
        >
          Borrar Categoria
        </button>
      </div>

      <dialog className='backdrop:bg-negro/70 absolute top-1/2 left-1/2 -translate-1/2 overflow-visible'>
        <div className='border-amarillo bg-negro text-blanco grid gap-8 overflow-hidden border p-8'>
          <button
            onClick={() => document.querySelector('dialog')?.close()}
            className='border-amarillo bg-negro hover:text-blanco absolute -top-2 -right-2 cursor-pointer border text-gray-300 transition'
          >
            <X />
          </button>
          <h1 className='text-amarillo max-w-52 text-center'>¿Seguro que quieres borrar la categoría "{nombre}"?</h1>
          <button
            onClick={handleDelete}
            className='text-rojo/60 border-rojo/60 hover:text-rojo hover:border-rojo disabled:text-rojo/30 disabled:border-rojo/30 flex cursor-pointer items-center justify-center gap-1 self-end rounded-md border transition'
            disabled={processingBorrado}
          >
            {processingBorrado && <LoaderCircle className='h-4 w-4 animate-spin' />}
            {processingBorrado ? 'Borrando...' : 'Borrar'}
          </button>
        </div>
      </dialog>

      <Toaster richColors />
    </AppLayout>
  )
}
