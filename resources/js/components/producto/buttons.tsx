import { cn } from '@/lib/utils'

interface Props {
  cantidad: number
  handleClickAddItem: (newCantidad: number) => void
  handleClickAddToCart: () => void
  className?: string
}

export function Buttons({ cantidad, handleClickAddItem, handleClickAddToCart, className = '' }: Props) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className='font-principal flex gap-1'>
        <button
          disabled={cantidad <= 0}
          onClick={() => handleClickAddItem(-1)}
          className='bg-amarillo text-md disabled:text-blanco flex-1 cursor-pointer rounded-md transition-colors disabled:cursor-not-allowed disabled:bg-red-800'
        >
          -
        </button>
        <span className='flex-2 text-center'>{cantidad}</span>
        <button
          onClick={() => handleClickAddItem(1)}
          className='bg-amarillo text-md flex-1 cursor-pointer rounded-md'
        >
          +
        </button>
      </div>

      <button
        onClick={handleClickAddToCart}
        className='bg-amarillo font-principal flex-1 cursor-pointer rounded-3xl disabled:cursor-not-allowed'
        disabled={cantidad === 0}
      >
        Añadir
      </button>
    </div>
  )
}
