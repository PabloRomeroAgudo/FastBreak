import Nav, { LinkValues } from '@/components/categoria/nav'
import AppLayout from '@/layouts/app-layout'
import { Head, useForm } from '@inertiajs/react'
import { LoaderCircle, Trash } from 'lucide-react'
import { ChangeEvent, FormEventHandler, useState } from 'react'
import { toast, Toaster } from 'sonner'

export default function Create() {
  const { data, setData, post, processing } = useForm({
    nombre: '',
    descripcion: '',
    imagen: null as File | null,
  })

  const [url, setUrl] = useState<string | null>(null)

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('categoria.store'), {
      onError: (errors) => Object.values(errors).forEach((error) => toast.error(error)),
    })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setData('imagen', file)
    setUrl(file ? URL.createObjectURL(file) : null)
  }

  return (
    <AppLayout
      subtitulo='Añadir Categoria'
      needBack={true}
    >
      <Head>
        <title>Añadir Categoria</title>
      </Head>

      <div className='flex flex-col gap-5'>
        <Nav active={LinkValues.categoria} />

        <div className='flex justify-center'>
          <form
            noValidate
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
                    alt={`Imagen de la categoria`}
                    className='aspect-square w-full object-contain'
                  />
                )}

                <div className='bg-blanco/40 absolute inset-0 grid size-full place-items-center rounded-sm p-2'>
                  <span>{url ? `Toca para cambiar` : `Toca para añadir`}</span>
                </div>
              </div>

              <div className='text-rojo cursor-pointer p-2'>
                <Trash
                  onClick={() => {
                    setData('imagen', null)
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
              Añadir
            </button>
          </form>
        </div>
      </div>

      <Toaster richColors />
    </AppLayout>
  )
}
