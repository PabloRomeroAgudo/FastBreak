import ImageInputWithPreview from '@/components/image-input-with-preview'
import LabelInput from '@/components/label-input'
import LabelTextArea from '@/components/label-textArea'
import SubmitButton from '@/components/submit-button'
import AppLayout from '@/layouts/app-layout'
import { Categoria } from '@/types'
import { Head, useForm } from '@inertiajs/react'
import { LoaderCircle, X } from 'lucide-react'
import { FormEventHandler, useState } from 'react'
import { toast, Toaster } from 'sonner'

interface Producto {
  id: number
  nombre: string
}

interface Categoria2 extends Categoria {
  productos: Producto[]
}

interface Props {
  categoria: Categoria2
  productosProp: Producto[]
}

export default function Edit({ categoria, productosProp }: Props) {
  const { nombre, descripcion, imagen } = categoria

  const { data, setData, post, processing } = useForm({
    nombre,
    descripcion,
    imagen: null as File | null,
    borrarImagen: false as boolean,
    productos: categoria.productos.map((p) => p.id) as number[] | null,
  })

  const { delete: destroy, processing: processingBorrado } = useForm({})

  const [url, setUrl] = useState(imagen)

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('categoria.update', { id: categoria.id, ...data, _method: 'PUT' }), {
      onError: (errors) => Object.values(errors).forEach((error) => toast.error(error)),
      onSuccess: () => toast.success('Categoria editada correctamente.'),
    })
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

      <div className='flex flex-col items-center gap-5'>
        <form
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
            texto='Guardar'
            processing={processing}
          />
        </form>

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
