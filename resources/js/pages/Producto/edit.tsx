import DeleteDialog, { TypeDelete } from '@/components/delete-dialog'
import FormLayout from '@/components/form-layout'
import ImageInputWithPreview from '@/components/image-input-with-preview'
import LabelInput, { InputTypes } from '@/components/label-input'
import LabelTextArea from '@/components/label-textArea'
import Pill from '@/components/pill'
import PillLayout from '@/components/pill-layout'
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
        <FormLayout handleSubmit={handleSubmit}>
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
        </FormLayout>

        <PillLayout
          titulo='Categorías a las que pertenece'
          data={'categoriasProp'}
        >
          {categoriasProp &&
            categoriasProp.map((categoria) => {
              return (
                <Pill
                  key={categoria.id}
                  nombre={categoria.nombre}
                  checked={!!data.categorias?.find((id) => id === categoria.id)}
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
              )
            })}
        </PillLayout>

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
