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
  hasPermission: boolean
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
  saldo: number
  esUsuario: boolean
  esAdmin: boolean
}

export type Categoria = {
  id: number
  nombre: string
  slug: string
  descripcion: string
  imagen: null | string
}

export type Producto = {
  id: number
  nombre: string
  precio: number
  descripcion: string
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

interface ProductoPedido {
  nombre: string
  pivot: {
    id_transaccion: number
    id_producto: number
    cantidad: number
  }
}

interface Pedido {
  id: number
  codigo: string
  fecha: string
  hora: string
  productos: ProductoPedido[]
}

// Paginacion que viene de Laravel
export type Pagination = {
  current_page: number
  data: Datum[]
  first_page_url: string
  from: number
  links: LinksPag[]
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: string
  to: number
}

export type Datum = {
  id: number
  nombre: string
  slug: string
  precio: number
  descripcion: string
  ingredientes: null
  alergenos: null
  max_stock: number
  imagen: null | string
  pivot: Pivot
}

export type LinksPag = {
  url: string
  label: string
  active: boolean
}

export type Pivot = {
  id_categoria: number
  id_producto: number
}
