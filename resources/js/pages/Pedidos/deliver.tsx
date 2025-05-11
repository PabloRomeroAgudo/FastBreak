import Nav, { LinkValues } from '@/components/pedidos/nav'
import Pedidos from '@/components/pedidos/pedidos'
import AppLayout from '@/layouts/app-layout'
import { Pedido } from '@/types'
import { Head } from '@inertiajs/react'

interface Props {
  pedidos: Pedido[]
}

export default function Deliver({ pedidos }: Props) {
  return (
    <AppLayout
      subtitulo='Pedidos'
      needBack={true}
    >
      <Head>
        <title>Pedidos para Entregar</title>
      </Head>

      <div className='flex flex-col gap-5'>
        <Nav active={LinkValues.entregar} />

        <Pedidos pedidos={pedidos} />
      </div>
    </AppLayout>
  )
}
