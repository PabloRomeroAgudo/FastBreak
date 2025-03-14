import Subtitle from '@/components/subtitle'
import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'

export type Categoria = {
  id: number
  nombre: string
  descripcion: string
  imagen: null | string
}

export type Producto = {
  id: number
  nombre: string
  precio: number
  descripcion: null
  ingredientes: null
  alergenos: null
  max_stock: number
  imagen: null
  pivot: Pivot
}

export type Pivot = {
  id_categoria: number
  id_producto: number
}

export default function Categoria({ categoria, productos }: { categoria: Categoria; productos: Producto[] }) {
  return (
    <AppLayout>
      <Head>
        <title>{categoria.nombre}</title>
      </Head>

      <Subtitle subtitulo={categoria.nombre} needBack={true} url='/categoria' />

      {productos.map((producto) => {
        return <p>{producto.nombre}</p>
      })}
    </AppLayout>
  )
}
