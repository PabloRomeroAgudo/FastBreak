import { getPrice2Decimals } from '@/lib/utils'

export default function Precio({ producto }: { producto: number }) {
  return (
    <p className='font-principal self-center text-4xl'>
      <span className='text-amarillofont-principal text-4xl'>TOTAL:</span> {getPrice2Decimals(producto)} €
    </p>
  )
}
