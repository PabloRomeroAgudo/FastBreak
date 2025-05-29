import { cn } from '@/lib/utils'

export default function BadgeCarrito({ totalCantidad, className = '' }: { totalCantidad: number; className?: string }) {
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
