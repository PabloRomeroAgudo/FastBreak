import AppLayout from '@/layouts/app-layout'
import { Head, useForm } from '@inertiajs/react'
import { LoaderCircle } from 'lucide-react'
import { FormEventHandler } from 'react'
import { toast, Toaster } from 'sonner'
import './../../../css/inputNumber.css'

type SaldoForm = {
  idUsuario: null | number
  cantidad: null | number
}

export default function Saldo() {
  const { data, setData, post, processing, reset } = useForm<Required<SaldoForm>>({
    idUsuario: null,
    cantidad: null,
  })

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route('saldo'), {
      onSuccess: () => {
        toast.success('Saldo añadido con éxito')
        reset('cantidad', 'idUsuario')
      },
      onError: (errors) => {
        Object.values(errors).forEach((error) => {
          toast.error(error)
        })
      },
    })
  }

  return (
    <AppLayout
      subtitulo='Añadir saldo'
      needBack={true}
    >
      <Head>
        <title>Añadir saldo</title>
      </Head>

      <div className='flex justify-center'>
        <form
          className='bg-negro font-principal flex w-1/3 min-w-xs flex-col justify-center gap-8 rounded-xl p-10'
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            className='bg-amarillo text-negro placeholder:text-negro rounded-md p-2'
            type='number'
            value={data.idUsuario || ''}
            onChange={(e) => setData('idUsuario', e.target.value ? Number(e.target.value) : null)}
            placeholder='ID del usuario'
          />

          <input
            className='bg-amarillo text-negro placeholder:text-negro rounded-md p-2'
            type='number'
            value={data.cantidad || ''}
            step={0.01}
            onChange={(e) => setData('cantidad', e.target.value ? Number(e.target.value) : null)}
            placeholder='Cantidad'
          />

          <button
            className='bg-amarillo disabled:bg-amarillo/40 flex cursor-pointer items-center gap-1 self-center rounded-sm px-6 py-1.5 disabled:cursor-not-allowed'
            type='submit'
            disabled={processing}
          >
            {processing && <LoaderCircle className='h-4 w-4 animate-spin' />}
            Añadir
          </button>
        </form>
      </div>

      <Toaster richColors />
    </AppLayout>
  )
}
