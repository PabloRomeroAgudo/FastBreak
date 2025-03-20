import { CardCategoria } from '@/components/categoria/cardCategoria'
import AppLayout from '@/layouts/app-layout'
import { Categoria } from '@/types'
import { Head } from '@inertiajs/react'

interface Props {
  categorias: Categoria[]
}

export default function Welcome({ categorias }: Props) {
  const hayProductos = categorias.length > 0

  const textTitle = hayProductos ? 'Elige una categoría' : 'No hay categorías'

  const someHasImage = categorias.some((categoria) => categoria.imagen)

  return (
    <AppLayout subtitulo={textTitle}>
      <Head>
        <title>Bienvenido</title>
      </Head>

      <section className='grid grid-cols-[repeat(auto-fit,minmax(12rem,20rem))] justify-center gap-4 px-8 has-hover:[&>*:not(:hover)]:grayscale'>
        {categorias &&
          categorias.map((categoria) => {
            return (
              <CardCategoria
                key={categoria.id}
                categoria={categoria}
                someHasImage={someHasImage}
              />
            )
          })}
      </section>
    </AppLayout>
  )
}
