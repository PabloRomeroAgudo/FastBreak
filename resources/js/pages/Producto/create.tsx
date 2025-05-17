import Nav, { LinkValues } from '@/components/categoria/nav'
import LabelInput, { InputTypes } from '@/components/label-input'
import LabelTextArea from '@/components/label-textArea'
import SubmitButton from '@/components/submit-button'
import AppLayout from '@/layouts/app-layout'
import { Head, useForm } from '@inertiajs/react'
import { Trash } from 'lucide-react'
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
  const { data, setData, post, processing, reset } = useForm({
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
      onSuccess: () => {
        toast.success('Producto creado correctamente.')
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
      subtitulo='Añadir Producto'
      needBack={true}
    >
      <Head>
        <title>Añadir Producto</title>
      </Head>

      <div className='flex flex-col gap-5'>
        <Nav active={LinkValues.producto} />

        <section className='flex justify-center'>
          <form
            noValidate
            onSubmit={handleSubmit}
            className='bg-negro font-principal text-blanco flex w-2/5 min-w-xs flex-col gap-8 rounded-xl p-10'
          >
            <LabelInput
              titulo='Nombre'
              value={data.nombre}
              onChange={(e) => setData('nombre', e.target.value)}
            />

            <LabelInput
              titulo='Precio'
              type={InputTypes.numero}
              value={data.precio || ''}
              onChange={(e) => setData('precio', e.target.value ? Number(e.target.value) : null)}
              step={0.01}
            />

            <LabelTextArea
              titulo='Descripción'
              value={data.descripcion}
              onChange={(e) => setData('descripcion', e.target.value)}
            />

            <LabelTextArea
              titulo='Ingredientes'
              value={data.ingredientes?.join(', ')}
              onChange={(e) => setData('ingredientes', e.target.value !== '' ? e.target.value.split(', ') : null)}
              placeholder='Espacios separados por ", "'
            />

            <LabelTextArea
              titulo='Alérgenos'
              value={data.alergenos?.join(', ')}
              onChange={(e) => setData('alergenos', e.target.value !== '' ? e.target.value.split(', ') : null)}
              placeholder='Espacios separados por ", "'
            />

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

            <SubmitButton
              texto='Añadir'
              processing={processing}
            />
          </form>
        </section>

        <section className='bg-negro grid w-3/5 min-w-max gap-3 self-center rounded-2xl p-3 text-white'>
          <h3 className='text-center text-2xl'>Categorías a las que pertenece</h3>
          <ul className='grid grid-cols-[repeat(auto-fit,15rem)] justify-center gap-3'>
            {categoriasProp.map((categoria) => {
              return (
                <li
                  key={categoria.id}
                  className='flex items-center justify-center'
                >
                  <div className='h-full w-full'>
                    <label className='has-checked:text-amarillo relative grid h-full cursor-pointer grid-cols-[max-content_1fr] items-center gap-2 rounded-full border px-2 py-1 transition-colors'>
                      <input
                        checked={!!data.categorias?.find((id) => id === categoria.id)}
                        type='checkbox'
                        className='peer checked:border-amarillo h-5 w-5 cursor-pointer appearance-none rounded border border-white shadow transition-all hover:shadow-md'
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
                        {categoria.nombre}
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
