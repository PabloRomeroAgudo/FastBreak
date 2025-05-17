import Nav, { LinkValues } from '@/components/categoria/nav'
import ImageInputWithPreview from '@/components/image-input-with-preview'
import LabelInput from '@/components/label-input'
import LabelTextArea from '@/components/label-textArea'
import SubmitButton from '@/components/submit-button'
import AppLayout from '@/layouts/app-layout'
import { Head, useForm } from '@inertiajs/react'
import { FormEventHandler, useState } from 'react'
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

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('categoria.store'), {
      onError: (errors) => Object.values(errors).forEach((error) => toast.error(error)),
      onSuccess: () => {
        toast.success('Categoria creada correctamente.')
        reset()
        setUrl(null)
      },
    })
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
            <LabelInput
              titulo='Nombre'
              value={data.nombre}
              onChange={(e) => setData('nombre', e.target.value)}
            />

            <LabelTextArea
              titulo='Descripción'
              value={data.descripcion}
              onChange={(e) => setData('descripcion', e.target.value)}
            />

            <ImageInputWithPreview
              setData={setData}
              url={url}
              setUrl={setUrl}
            />

            <SubmitButton
              texto='Añadir'
              processing={processing}
            />
          </form>
        </section>

        <section className='bg-negro grid w-3/5 min-w-max gap-3 self-center rounded-2xl p-3 text-white'>
          <h3 className='text-center text-2xl'>Productos a añadir</h3>
          <ul className='grid grid-cols-[repeat(auto-fit,15rem)] justify-center gap-3'>
            {productosProp.map((producto) => {
              return (
                <li
                  key={producto.id}
                  className='flex items-center justify-center'
                >
                  <div className='h-full w-full'>
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
