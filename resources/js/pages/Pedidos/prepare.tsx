import Nav, { LinkValues } from '@/components/pedidos/nav'
import Pedidos from '@/components/pedidos/pedidos'
import AppLayout from '@/layouts/app-layout'
import { Pedido } from '@/types'
import { Head } from '@inertiajs/react'

interface Props {
  pedidos: Pedido[]
}

export default function Prepare({ pedidos }: Props) {
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
