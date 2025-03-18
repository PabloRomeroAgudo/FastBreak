import { LucideIcon } from 'lucide-react'
import type { Config } from 'ziggy-js'

export interface Auth {
  user: User
}

export interface BreadcrumbItem {
  title: string
  href: string
}

export interface NavGroup {
  title: string
  items: NavItem[]
}
type method = 'post' | 'get' | 'delete' | 'patch' | 'put'
export interface NavItem {
  title: string
  url: string
  icon?: LucideIcon | null
  isActive?: boolean
  isIcon: boolean
  method: method
}

export interface SharedData {
  name: string
  quote: { message: string; author: string }
  auth: Auth
  ziggy: Config & { location: string }
  [key: string]: unknown
}

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
  [key: string]: unknown // This allows for additional properties...
  saldo: string
}

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
  descripcion: string | null
  ingredientes: string | null
  alergenos: string | null
  max_stock: number
  imagen: string | null
  pivot: PivotProducto
}

type PivotProducto = {
  id_categoria: number
  id_producto: number
}

export type ProductoCarrito = Pick<Producto, 'id' | 'nombre' | 'precio' | 'descripcion'?> & { cantidad: number }

export type Carrito = {
  productos: ProductoCarrito[]
  precioTotal: number
}
