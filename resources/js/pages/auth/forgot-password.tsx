// Components
import { Head, useForm } from '@inertiajs/react'
import { LoaderCircle } from 'lucide-react'
import { FormEventHandler } from 'react'

import InputError from '@/components/input-error'
import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AuthLayout from '@/layouts/auth-layout'

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
    email: '',
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('password.email'))
  }

  return (
    <AuthLayout description='Introduce tu email para recibir un enlace para reiniciar la contraseña'>
      <Head title='Forgot password' />

      {status && <div className='mb-4 text-center text-sm font-medium text-green-600'>{status}</div>}

      <div className='space-y-6'>
        <form onSubmit={submit}>
          <div className='grid gap-2'>
            <Input
              id='email'
              type='email'
              name='email'
              autoComplete='off'
              value={data.email}
              autoFocus
              onChange={(e) => setData('email', e.target.value)}
              placeholder='Email'
              className='bg-amarillo text-negro font-principal placeholder:text-negro border-0'
            />

            <InputError message={errors.email} />
          </div>

          <div className='my-6 flex items-center justify-start'>
            <Button
              className='hover:bg-amarillo text-blanco font-principal hover:text-negro mt-4 w-full cursor-pointer text-xl'
              disabled={processing}
            >
              {processing && <LoaderCircle className='h-4 w-4 animate-spin' />}
              Enviar enlace
            </Button>
          </div>
        </form>

        <div className='text-amarillo space-x-1 text-center text-sm'>
          <span>O, vuelve a</span>
          <TextLink
            href={route('login')}
            className='text-blanco'
          >
            Iniciar sesión
          </TextLink>
        </div>
      </div>
    </AuthLayout>
  )
}
