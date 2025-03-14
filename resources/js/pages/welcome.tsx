import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'

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
            return (
              <Link href={`/categoria/${categoria.nombre}`} className='group flex flex-col gap-2' key={categoria.id}>
                {categoria.imagen && (
                  <div className='overflow-clip rounded-xl transition duration-300'>
                    <img
                      src={categoria.imagen}
                      alt={`Imagen de la categoria ${categoria.nombre}`}
                      className='aspect-square transition-transform group-hover:scale-120'
                    />
                  </div>
                )}
                <h3 className='after:bg-amarillo group-hover:text-amarillo relative w-fit text-2xl font-bold transition-all group-hover:scale-110 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:transition-all after:ease-linear group-hover:after:scale-x-100'>
                  {categoria.nombre}
                </h3>
                <p className='text-gris group-hover:text-negro transition-colors'>{categoria.descripcion}</p>
              </Link>
            )
          })}
      </section>
    </AppLayout>
  )
}
