import Nav, { LinkValues } from '@/components/pedidos/nav'
import Pedidos from '@/components/pedidos/pedidos'
import AppLayout from '@/layouts/app-layout'
import { Pedido } from '@/types'
import { Head } from '@inertiajs/react'

interface Props {
  pedidos: Pedido[]
}

export default function Prepare({ pedidos }: Props) {
  console.log(pedidos)
  return (
    <AppLayout subtitulo='Pedidos'>
      <Head>
        <title>Pedidos para preparar</title>
      </Head>

      <div>
        <Nav active={LinkValues.preparar} />

        <Pedidos pedidos={pedidos} />
      </div>
    </AppLayout>
  )
}
