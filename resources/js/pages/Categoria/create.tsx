import Nav, { LinkValues } from '@/components/categoria/nav'
import FormLayout from '@/components/form-layout'
import ImageInputWithPreview from '@/components/image-input-with-preview'
import LabelInput from '@/components/label-input'
import LabelTextArea from '@/components/label-textArea'
import Pill from '@/components/pill'
import PillLayout from '@/components/pill-layout'
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
              texto='Añadir'
              processing={processing}
            />
          </FormLayout>
        </section>

        <PillLayout
          titulo='Productos a añadir'
          data={'productosProp'}
        >
          {productosProp &&
            productosProp.map((producto) => {
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
      </div>

      <Toaster richColors />
    </AppLayout>
  )
}
