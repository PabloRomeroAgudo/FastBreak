import AppLayout from '@/layouts/app-layout'
import { Categoria } from '@/types'
import { Head, router, useForm } from '@inertiajs/react'
import { LoaderCircle, Trash } from 'lucide-react'
import { ChangeEvent, FormEventHandler, useState } from 'react'
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

  const [url, setUrl] = useState(imagen)

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('categoria.update', { id: categoria.id, ...data, _method: 'PUT' }), {
      onError: (errors) => Object.values(errors).forEach((error) => toast.error(error)),
      onSuccess: () => toast.success('Categoria editada correctamente.'),
    })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setData('imagen', file)
    setUrl(file ? URL.createObjectURL(file) : null)
  }

  const handleDelete = () => {
    router.delete(route('categoria.destroy', categoria.id))
  }

  return (
    <AppLayout
      subtitulo={`Editar categoria "${nombre}"`}
      needBack={true}
      url={route('home')}
    >
      <Head>
        <title>{`Editar categoria "${nombre}"`}</title>
      </Head>

      <div className='flex flex-col items-center gap-2'>
        <form
          onSubmit={handleSubmit}
          className='bg-negro font-principal flex w-1/3 min-w-xs flex-col justify-center gap-8 rounded-xl p-10'
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
              className='bg-amarillo text-negro placeholder:text-negro font-body field-sizing-content rounded-md p-2'
            />
          </label>

          <div className='grid justify-items-center gap-2 self-center'>
            <div className='relative size-56 overflow-hidden rounded-2xl'>
              <input
                className='absolute inset-0 z-10 size-full cursor-pointer text-transparent file:hidden'
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
                <span>Toca para cambiar</span>
              </div>
            </div>

            <div className='text-rojo cursor-pointer p-2'>
              <Trash
                onClick={() => {
                  setData('borrarImagen', true)
                  setUrl(null)
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
          onClick={handleDelete}
        >
          Borrar Categoria
        </button>
      </div>

      <Toaster richColors />
    </AppLayout>
  )
}
