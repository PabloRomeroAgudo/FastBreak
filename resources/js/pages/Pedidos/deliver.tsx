import Nav, { LinkValues } from '@/components/pedidos/nav'
import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'

export default function Deliver() {
  return (
    <AppLayout subtitulo='Pedidos'>
      <Head>
        <title>Pedidos para Entregar</title>
      </Head>

      <div>
        <Nav active={LinkValues.entregar} />
      </div>
    </AppLayout>
  )
}
