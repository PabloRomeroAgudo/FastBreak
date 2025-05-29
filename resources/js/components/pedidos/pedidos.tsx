import { Pedido } from '@/types'
import { ArrowRight } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import ElemPedido from './elemPedido'

interface Props {
  pedidos: Pedido[]
  isPrepare?: boolean
}

export default function Pedidos({ pedidos, isPrepare = false }: Props) {
  const [codigo, setCodigo] = useState('')
  const textNotFound = codigo ? `No hay pedidos con el código ${codigo}` : 'No hay pedidos'

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCodigo(e.target.value)
  }

  const pedidosFiltered = pedidos.filter((p) => p.codigo.includes(codigo))

  return (
    <>
      {!isPrepare && (
        <input
          type='text'
          placeholder='Código'
          className='border-negro/60 focus:border-negro w-50 self-center border-2 p-2 outline-0 transition-all placeholder:italic focus:rounded-md'
          onChange={handleChange}
          maxLength={4}
          inputMode='numeric'
        />
      )}

      {pedidosFiltered.length > 0 ? (
        <section className='grid gap-2'>
          {pedidosFiltered.map((pedido, index) => {
            return (
              <details
                className='bg-negro group p-3 text-white open:pb-12'
                key={pedido.id}
              >
                <summary className='font-principal flex cursor-pointer list-none items-center gap-2 text-xl md:text-3xl'>
                  <ArrowRight
                    size={30}
                    className='transition-transform duration-300 group-open:rotate-90'
                  />

                  <div className='grid grow grid-cols-3 items-center text-center transition-opacity group-open:opacity-0'>
                    <h3>Pedido {index + 1}</h3>
                    <span className='text-amarillo text-3xl md:text-5xl'>Código: {pedido.codigo}</span>
                    <span>
                      {pedido.fecha} {pedido.hora}
                    </span>
                  </div>
                </summary>

                <ElemPedido
                  pedido={pedido}
                  isPrepare={isPrepare}
                />
              </details>
            )
          })}
        </section>
      ) : (
        <h3 className='font-principal text-rojo max-w-3xl self-center text-center text-4xl text-balance md:text-6xl'>{textNotFound}</h3>
      )}
    </>
  )
}
