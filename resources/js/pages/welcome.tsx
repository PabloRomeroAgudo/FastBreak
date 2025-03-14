import { CardCategoria } from '@/components/categoria/card'
import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'

export type Categoria = {
  id: number
  nombre: string
  descripcion: string
  imagen: null | string
}

export default function Welcome({ categorias }: { categorias: Categoria[] }) {
  const hayProductos = categorias.length > 0

  const textTitle = hayProductos ? 'Elige una categoría' : 'No hay categorías'

  return (
    <AppLayout>
      <Head>
        <title>Bienvenido</title>
      </Head>

      <h2 className='text-amarillo bg-negro mt-4 py-4 text-center'>{textTitle}</h2>

      <section className='grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-4 px-8 has-hover:[&>*:not(:hover)]:grayscale'>
        {categorias &&
          categorias.map((categoria) => {
            return <CardCategoria categoria={categoria} />
          })}
      </section>
    </AppLayout>
  )
}
