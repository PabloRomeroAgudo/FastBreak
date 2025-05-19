import DeleteDialog, { TypeDelete } from '@/components/delete-dialog'
import ImageInputWithPreview from '@/components/image-input-with-preview'
import LabelInput, { InputTypes } from '@/components/label-input'
import LabelTextArea from '@/components/label-textArea'
import SubmitButton from '@/components/submit-button'
import AppLayout from '@/layouts/app-layout'
import { Producto } from '@/types'
import { Head, useForm } from '@inertiajs/react'
import { FormEventHandler, useState } from 'react'
import { toast, Toaster } from 'sonner'
import '../../../css/inputNumber.css'

interface Categoria {
  id: number
  nombre: string
}

interface Producto2 extends Omit<Producto, 'pivot'> {
  categorias: Categoria[]
}

interface Props {
  producto: Producto2
  categoriasProp: Categoria[]
}

export default function Edit({ producto, categoriasProp }: Props) {
  const { nombre, precio, descripcion, ingredientes, alergenos, imagen } = producto

  const { data, setData, post, processing } = useForm({
    nombre,
    precio: precio as number | null,
    descripcion,
    ingredientes: ingredientes?.split(', ') ?? null,
    alergenos: alergenos?.split(', ') ?? null,
    imagen: null as File | null,
    borrarImagen: false as boolean,
    categorias: producto.categorias.map((c) => c.id) as number[] | null,
  })

  const [url, setUrl] = useState(imagen)

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('producto.update', { id: producto.id, ...data, _method: 'PUT' }), {
      onError: (errors) => Object.values(errors).forEach((error) => toast.error(error)),
      onSuccess: () => toast.success('Producto editado correctamente.'),
    })
  }

  return (
    <AppLayout
      subtitulo={`Editar producto "${nombre}"`}
      needBack={true}
    >
      <Head>
        <title>{`Editar producto "${nombre}"`}</title>
      </Head>

      <div className='flex flex-col items-center gap-5'>
        <form
          onSubmit={handleSubmit}
          className='bg-negro font-principal text-blanco flex w-2/5 min-w-xs flex-col justify-center gap-8 rounded-xl p-10'
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

          <ImageInputWithPreview
            setData={setData}
            imagenInicial={imagen}
            url={url}
            setUrl={setUrl}
          />

          <SubmitButton
            texto='Guardar'
            processing={processing}
          />
        </form>

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
                        type='checkbox'
                        checked={!!data.categorias?.find((id) => id === categoria.id)}
                        className='peer checked:border-amarillo h-5 w-5 cursor-pointer appearance-none rounded border border-white shadow transition-all hover:shadow-md'
                        onChange={(e) => {
                          if (e.target.checked) {
                            const nuevoArr = [...(data.categorias || [])]
                            nuevoArr.push(categoria.id)
                            setData('categorias', nuevoArr)
                          } else {
                            const nuevoArr = data.categorias?.filter((p) => p !== categoria.id) || []
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

        <button
          className='bg-negro text-rojo cursor-pointer rounded-md p-2'
          onClick={() => document.querySelector('dialog')?.showModal()}
        >
          Borrar Producto
        </button>
      </div>

      <DeleteDialog
        id={producto.id}
        nombre={nombre}
        type={TypeDelete.PRODUCTO}
      />

      <Toaster richColors />
    </AppLayout>
  )
}
