import Nav, { LinkValues } from '@/components/categoria/nav'
import AppLayout from '@/layouts/app-layout'
import { Head, useForm } from '@inertiajs/react'
import { LoaderCircle, Trash } from 'lucide-react'
import { ChangeEvent, FormEventHandler, useRef, useState } from 'react'
import { toast, Toaster } from 'sonner'

interface Producto {
  id: number
  nombre: string
}

interface Props {
  productosProp: Producto[]
}

export default function Create({ productosProp }: Props) {
  const { data, setData, post, processing, reset } = useForm({
    nombre: '',
    descripcion: '',
    imagen: null as File | null,
    productos: null as number[] | null,
  })

  const [url, setUrl] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('categoria.store'), {
      onError: (errors) => Object.values(errors).forEach((error) => toast.error(error)),
      onSuccess: () => {
        toast.success('Categoria creada correctamente.')
        reset()
      },
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

        <section className='flex justify-center'>
          <form
            noValidate
            onSubmit={handleSubmit}
            className='bg-negro text-blanco font-principal flex w-2/5 min-w-xs flex-col justify-center gap-8 rounded-xl p-10'
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

                <div className='bg-blanco/40 text-negro absolute inset-0 grid size-full place-items-center rounded-sm p-2'>
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
        </section>

        <section className='bg-negro grid w-3/5 min-w-max justify-center gap-3 self-center rounded-2xl p-3 text-white'>
          <h3 className='text-center text-2xl'>Productos a añadir</h3>
          <ul className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:justify-items-center lg:grid-cols-3'>
            {productosProp.map((producto) => {
              return (
                <li
                  key={producto.id}
                  className='flex w-full items-center'
                >
                  <div className='h-full w-full max-w-72'>
                    <label className='has-checked:text-amarillo relative grid h-full cursor-pointer grid-cols-[max-content_1fr] items-center gap-2 rounded-full border px-2 py-1 transition-colors'>
                      <input
                        type='checkbox'
                        checked={!!data.productos?.find((id) => id === producto.id)}
                        className='peer checked:border-amarillo h-5 w-5 cursor-pointer appearance-none rounded border border-white shadow transition-all hover:shadow-md'
                        onChange={(e) => {
                          if (e.target.checked) {
                            const nuevoArr = [...(data.productos || [])]
                            nuevoArr.push(producto.id)
                            setData('productos', nuevoArr)
                          } else {
                            const nuevoArr = data.productos?.filter((p) => p !== producto.id) || []
                            setData('productos', nuevoArr.length > 0 ? nuevoArr : null)
                          }
                        }}
                      />
                      <span className='pointer-events-none absolute left-2 size-5 transform opacity-0 transition-opacity peer-checked:opacity-100'>
                        <svg
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                            clipRule='evenodd'
                          ></path>
                        </svg>
                      </span>
                      <span className='[&::-webkit-scrollbar-track]:bg-negro overflow-auto text-nowrap decoration-1 underline-offset-2 peer-checked:underline [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full'>
                        {producto.nombre}
                      </span>
                    </label>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      </div>

      <Toaster richColors />
    </AppLayout>
  )
}
