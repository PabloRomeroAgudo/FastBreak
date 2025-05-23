import Nav, { LinkValues } from '@/components/categoria/nav'
import FormLayout from '@/components/form-layout'
import ImageInputWithPreview from '@/components/image-input-with-preview'
import LabelInput, { InputTypes } from '@/components/label-input'
import LabelTextArea from '@/components/label-textArea'
import Pill from '@/components/pill'
import PillLayout from '@/components/pill-layout'
import SubmitButton from '@/components/submit-button'
import AppLayout from '@/layouts/app-layout'
import { Head, useForm } from '@inertiajs/react'
import { FormEventHandler, useState } from 'react'
import { toast, Toaster } from 'sonner'
import '../../../css/inputNumber.css'

interface Categoria {
  id: number
  nombre: string
}

interface Props {
  categoriasProp: Categoria[]
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

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('producto.store'), {
      onError: (errors) => Object.values(errors).forEach((error) => toast.error(error)),
      onSuccess: () => {
        toast.success('Producto creado correctamente.')
        reset()
        setUrl(null)
      },
    })
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
              url={url}
              setUrl={setUrl}
            />

            <SubmitButton
              texto='Añadir'
              processing={processing}
            />
          </FormLayout>
        </section>

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
                      const nuevoArr = data.categorias?.filter((c) => c !== categoria.id) || []
                      setData('categorias', nuevoArr.length > 0 ? nuevoArr : null)
                    }
                  }}
                />
              )
            })}
        </PillLayout>
      </div>

      <Toaster richColors />
    </AppLayout>
  )
}
