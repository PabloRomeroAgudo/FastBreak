import { CarritoContext } from '@/context/carrito'
import { cn } from '@/lib/utils'
import { useContext } from 'react'

export default function BadgeCarrito({ className = '' }: { className?: string }) {
  const contexto = useContext(CarritoContext)
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider')
  }
  const { carrito } = contexto
  const totalCantidad = carrito.productos.reduce((acc, producto) => acc + producto.cantidad, 0)

  return (
    totalCantidad > 0 && (
      <span
        className={cn(
          'text-amarillo group-hover:text-negro absolute -top-2 right-0.5 inline-flex size-3 items-center justify-center rounded-full p-2 text-xs',
          className,
        )}
      >
        {totalCantidad}
      </span>
    )
  )
}
