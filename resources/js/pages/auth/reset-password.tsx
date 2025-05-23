import { Head, useForm } from '@inertiajs/react'
import { LoaderCircle } from 'lucide-react'
import { FormEventHandler } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AuthLayout from '@/layouts/auth-layout'
import { toast, Toaster } from 'sonner'

interface ResetPasswordProps {
  token: string
  email: string
}

type ResetPasswordForm = {
  token: string
  email: string
  password: string
  password_confirmation: string
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
  const { data, setData, post, processing, reset } = useForm<Required<ResetPasswordForm>>({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route('password.store'), {
      onError: (errors) => Object.values(errors).forEach((error) => toast.error(error)),
      onFinish: () => reset('password', 'password_confirmation'),
    })
  }

  return (
    <AuthLayout description='Introduzca su nueva contraseña a continuación'>
      <Head title='Reset password' />

      <form onSubmit={submit}>
        <div className='grid gap-6'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              name='email'
              autoComplete='email'
              value={data.email}
              className='mt-1 block w-full'
              readOnly
              onChange={(e) => setData('email', e.target.value)}
            />
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='password'>Contraseña</Label>
            <Input
              id='password'
              type='password'
              name='password'
              autoComplete='new-password'
              value={data.password}
              className='mt-1 block w-full'
              autoFocus
              onChange={(e) => setData('password', e.target.value)}
              placeholder='Contraseña'
            />
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='password_confirmation'>Confirmar contraseña</Label>
            <Input
              id='password_confirmation'
              type='password'
              name='password_confirmation'
              autoComplete='new-password'
              value={data.password_confirmation}
              className='mt-1 block w-full'
              onChange={(e) => setData('password_confirmation', e.target.value)}
              placeholder='Confirmar contraseña'
            />
          </div>

          <Button
            type='submit'
            className='mt-4 w-full'
            disabled={processing}
          >
            {processing && <LoaderCircle className='h-4 w-4 animate-spin' />}
            Reiniciar contraseña
          </Button>
        </div>
      </form>

      <Toaster richColors />
    </AuthLayout>
  )
}
