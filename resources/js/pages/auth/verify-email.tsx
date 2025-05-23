// Components
import { Head, useForm } from '@inertiajs/react'
import { LoaderCircle } from 'lucide-react'
import { FormEventHandler } from 'react'

import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import AuthLayout from '@/layouts/auth-layout'

export default function VerifyEmail({ status }: { status?: string }) {
  const { post, processing } = useForm({})

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('verification.send'))
  }

  return (
    <AuthLayout description='Verifique su dirección de correo electrónico haciendo clic en el enlace que acabamos de enviarle.'>
      <Head title='Email verification' />

      {status === 'verification-link-sent' && (
        <div className='mb-4 text-center text-sm font-medium text-green-600'>
          Se ha enviado un nuevo enlace de verificación a la dirección de correo electrónico que proporcionó durante el registro.
        </div>
      )}

      <form
        onSubmit={submit}
        className='space-y-6 text-center'
      >
        <Button
          disabled={processing}
          variant='secondary'
          className='cursor-pointer'
        >
          {processing && <LoaderCircle className='h-4 w-4 animate-spin' />}
          Reenviar correo electrónico de verificación
        </Button>

        <TextLink
          href={route('logout')}
          method='post'
          className='mx-auto block text-sm text-white'
        >
          Log out
        </TextLink>
      </form>
    </AuthLayout>
  )
}
