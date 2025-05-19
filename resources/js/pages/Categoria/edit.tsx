import DeleteDialog, { TypeDelete } from '@/components/delete-dialog'
import FormLayout from '@/components/form-layout'
import ImageInputWithPreview from '@/components/image-input-with-preview'
import LabelInput from '@/components/label-input'
import LabelTextArea from '@/components/label-textArea'
import Pill from '@/components/pill'
import PillLayout from '@/components/pill-layout'
import SubmitButton from '@/components/submit-button'
import AppLayout from '@/layouts/app-layout'
import { Categoria } from '@/types'
import { Head, useForm } from '@inertiajs/react'
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

  const [url, setUrl] = useState(imagen)

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('categoria.update', { id: categoria.id, ...data, _method: 'PUT' }), {
      onError: (errors) => Object.values(errors).forEach((error) => toast.error(error)),
      onSuccess: () => toast.success('Categoria editada correctamente.'),
    })
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
        <FormLayout handleSubmit={handleSubmit}>
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
        </FormLayout>

        <PillLayout titulo='Productos a añadir'>
          {productosProp.map((producto) => {
            return (
              <Pill
                key={producto.id}
                nombre={producto.nombre}
                checked={!!data.productos?.find((id) => id === producto.id)}
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
            )
          })}
        </PillLayout>

        <button
          className='bg-negro text-rojo cursor-pointer rounded-md p-2'
          onClick={() => document.querySelector('dialog')?.showModal()}
        >
          Borrar Categoria
        </button>
      </div>

      <DeleteDialog
        id={categoria.id}
        nombre={nombre}
        type={TypeDelete.CATEGORIA}
      />

      <Toaster richColors />
    </AppLayout>
  )
}
