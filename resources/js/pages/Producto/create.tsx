import Nav, { LinkValues } from '@/components/categoria/nav'
import AppLayout from '@/layouts/app-layout'
import { Head, useForm } from '@inertiajs/react'
import { LoaderCircle, Trash } from 'lucide-react'
import { ChangeEvent, FormEventHandler, useRef, useState } from 'react'
import { toast, Toaster } from 'sonner'
import '../../../css/inputNumber.css'

interface Categorias {
  id: number
  nombre: string
}

interface Props {
  categoriasProp: Categorias[]
}

export default function Create({ categoriasProp }: Props) {
  const { data, setData, post, processing } = useForm({
    nombre: '',
    precio: null as number | null,
    descripcion: '',
    ingredientes: null as string[] | null,
    alergenos: null as string[] | null,
    imagen: null as File | null,
    categorias: null as number[] | null,
  })

  const [url, setUrl] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('producto.store'), {
      onError: (errors) => Object.values(errors).forEach((error) => toast.error(error)),
      onSuccess: () => toast.success('Producto añadido correctamente.'),
    })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setData('imagen', file)
    setUrl(file ? URL.createObjectURL(file) : null)
  }

  return (
    <AppLayout
      subtitulo='Añadir Producto'
      needBack={true}
    >
      <Head>
        <title>Añadir Producto</title>
      </Head>

      <div className='flex flex-col gap-5'>
        <Nav active={LinkValues.producto} />

        <div className='flex justify-center'>
          <form
            noValidate
            onSubmit={handleSubmit}
            className='bg-negro font-principal text-blanco flex w-2/5 min-w-xs flex-col gap-8 rounded-xl p-10'
          >
            <label className='flex flex-col'>
              Nombre:
              <input
                type='text'
                value={data.nombre}
                onChange={(e) => setData('nombre', e.target.value)}
                className='bg-amarillo text-negro placeholder:text-negro rounded-md p-2'
              />
            </label>

            <label className='flex flex-col'>
              Precio:
              <input
                type='number'
                value={data.precio || ''}
                step={0.01}
                onChange={(e) => setData('precio', e.target.value ? Number(e.target.value) : null)}
                className='bg-amarillo text-negro placeholder:text-negro rounded-md p-2'
              />
            </label>

            <label className='flex flex-col'>
              Descripción:
              <textarea
                value={data.descripcion}
                onChange={(e) => setData('descripcion', e.target.value)}
                className='bg-amarillo text-negro font-body field-sizing-content max-h-[calc(5lh_+_8px)] resize-none rounded-md p-2'
              />
            </label>

            <label className='flex flex-col'>
              Ingredientes:
              <textarea
                value={data.ingredientes?.join(', ')}
                onChange={(e) => setData('ingredientes', e.target.value !== '' ? e.target.value.split(', ') : null)}
                placeholder='Espacios separados por ", "'
                className='bg-amarillo text-negro font-body field-sizing-content max-h-[calc(5lh_+_8px)] resize-none rounded-md p-2'
              />
            </label>

            <label className='flex flex-col'>
              Alérgenos:
              <input
                type='text'
                value={data.alergenos?.join(', ')}
                placeholder='Espacios separados por ", "'
                onChange={(e) => setData('alergenos', e.target.value !== '' ? e.target.value.split(', ') : null)}
                className='bg-amarillo text-negro font-body rounded-md p-2'
              />
            </label>

            <div className='grid justify-items-center gap-2 self-center'>
              <div className='relative size-56 overflow-hidden rounded-2xl'>
                <input
                  className='absolute inset-0 z-10 size-full cursor-pointer text-transparent file:hidden'
                  type='file'
                  ref={inputRef}
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
                    if (inputRef.current) {
                      inputRef.current.value = ''
                    }
                  }}
                />
              </div>
            </div>

            <button
              className='bg-amarillo disabled:bg-amarillo/40 text-negro flex cursor-pointer items-center gap-1 self-center rounded-sm px-6 py-1.5 disabled:cursor-not-allowed'
              type='submit'
              disabled={processing}
            >
              {processing && <LoaderCircle className='h-4 w-4 animate-spin' />}
              Añadir
            </button>
          </form>
        </div>

        <ul className='bg-negro grid w-3/5 min-w-max grid-cols-1 items-center justify-items-center self-center rounded-2xl p-3 text-white sm:grid-cols-2 lg:grid-cols-3'>
          {categoriasProp.map((categoria) => {
            return (
              <li
                key={categoria.id}
                className='w-60'
              >
                <label className='relative flex w-fit cursor-pointer items-center gap-2 text-xl'>
                  <input
                    type='checkbox'
                    className='peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow transition-all hover:shadow-md'
                    onChange={(e) => {
                      if (e.target.checked) {
                        const nuevoArr = [...(data.categorias || [])]
                        nuevoArr.push(categoria.id)
                        setData('categorias', nuevoArr)
                      } else {
                        const nuevoArr = data.categorias?.filter((c) => c !== categoria.id) || []
                        setData('categorias', nuevoArr.length > 0 ? nuevoArr : null)
                      }
                    }}
                  />
                  <span className='pointer-events-none absolute size-5 transform text-white opacity-0 peer-checked:opacity-100'>
                    <svg
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      stroke='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </span>
                  <span className='decoration-1 underline-offset-2 peer-checked:underline'>{categoria.nombre}</span>
                </label>
              </li>
            )
          })}
        </ul>
      </div>

      <Toaster richColors />
    </AppLayout>
  )
}
