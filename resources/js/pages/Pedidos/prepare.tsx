import Nav, { LinkValues } from '@/components/pedidos/nav'
import Pedidos from '@/components/pedidos/pedidos'
import AppLayout from '@/layouts/app-layout'
import { Pedido } from '@/types'
import { Head, usePage, usePoll } from '@inertiajs/react'

export default function Prepare() {
  const { pedidos } = usePage<{ pedidos: Pedido[] }>().props

  usePoll(40000, { only: ['pedidos'] })

  return (
    <AppLayout
      subtitulo='Pedidos'
      needBack={true}
    >
      <Head>
        <title>Pedidos para preparar</title>
      </Head>

      <div className='flex flex-col gap-5'>
        <Nav active={LinkValues.preparar} />

        <Pedidos
          pedidos={pedidos}
          isPrepare
        />
      </div>
    </AppLayout>
  )
}
