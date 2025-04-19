import ElemPedido from '@/components/pedidos/elemPedido'
import Nav, { LinkValues } from '@/components/pedidos/nav'
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

        <section className='grid gap-2'>
          {pedidos.map((pedido) => {
            return (
              <ElemPedido
                key={pedido.id}
                pedido={pedido}
              />
            )
          })}
        </section>
      </div>
    </AppLayout>
  )
}
