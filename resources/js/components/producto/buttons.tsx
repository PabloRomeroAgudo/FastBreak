interface Props {
  cantidad: number
  handleClickAddItem: (newCantidad: number) => void
  handleClickAddToCart: () => void
}

export function Buttons({ cantidad, handleClickAddItem, handleClickAddToCart }: Props) {
  return (
    <div className='flex flex-col gap-3'>
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
