import { Trash } from 'lucide-react'
import { ChangeEvent, useRef } from 'react'

interface Props {
  setData: (campo: string, valor: File | boolean | null) => void
  url: string | null
  setUrl: (newUrl: string | null) => void
  imagenInicial?: string | null
  textoSinFoto?: string
  textoConFoto?: string
}

export default function ImageInputWithPreview({
  setData,
  url,
  setUrl,
  textoSinFoto = 'Toca para añadir',
  textoConFoto = 'Toca para cambiar',
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setData('imagen', file)
    setUrl(file ? URL.createObjectURL(file) : null)
  }

  return (
    <div className='grid justify-items-center gap-2 self-center'>
      <div className='relative size-56 overflow-hidden rounded-2xl'>
        <input
          className='absolute inset-0 z-10 size-full cursor-pointer text-transparent file:hidden'
          type='file'
          ref={inputRef}
          accept='.jpg, .jpeg, .png, .webp'
          onChange={handleFileChange}
        />
        {url && (
          <img
            src={url}
            alt={`Imagen de la categoria`}
            className='aspect-square w-full object-contain'
          />
        )}

        <div className='bg-blanco/40 text-negro absolute inset-0 grid size-full place-items-center rounded-sm p-2'>
          <span>{url ? textoConFoto : textoSinFoto}</span>
        </div>
      </div>

      <div
        className='text-rojo cursor-pointer p-2'
        onClick={() => {
          setData('borrarImagen', true)
          setData('imagen', null)
          setUrl(null)
          if (inputRef.current) {
            inputRef.current.value = ''
          }
        }}
      >
        <Trash />
      </div>
    </div>
  )
}
