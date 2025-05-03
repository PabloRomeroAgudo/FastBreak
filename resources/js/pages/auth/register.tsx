import { Head, useForm } from '@inertiajs/react'
import { LoaderCircle } from 'lucide-react'
import { FormEventHandler } from 'react'

import InputError from '@/components/input-error'
import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AuthLayout from '@/layouts/auth-layout'

type RegisterForm = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    })
  }

  return (
    <AuthLayout description=''>
      <Head title='Register' />
      <form
        className='flex flex-col gap-6'
        onSubmit={submit}
      >
        <div className='grid gap-6'>
          <div className='grid gap-2'>
            <Input
              id='name'
              type='text'
              required
              autoFocus
              tabIndex={1}
              autoComplete='name'
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              disabled={processing}
              placeholder='Nombre'
              className='bg-amarillo text-negro font-principal placeholder:text-negro border-0'
            />
            <InputError
              message={errors.name}
              className='mt-2'
            />
          </div>

          <div className='grid gap-2'>
            <Input
              id='email'
              type='email'
              required
              tabIndex={2}
              autoComplete='email'
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              disabled={processing}
              placeholder='Email'
              className='bg-amarillo text-negro font-principal placeholder:text-negro border-0'
            />
            <InputError message={errors.email} />
          </div>

          <div className='grid gap-2'>
            <Input
              id='password'
              type='password'
              required
              tabIndex={3}
              autoComplete='new-password'
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              disabled={processing}
              placeholder='Contraseña'
              className='bg-amarillo text-negro font-principal placeholder:text-negro border-0'
            />
            <InputError message={errors.password} />
          </div>

          <div className='grid gap-2'>
            <Input
              id='password_confirmation'
              type='password'
              required
              tabIndex={4}
              autoComplete='new-password'
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              disabled={processing}
              placeholder='Confirmar contraseña'
              className='bg-amarillo text-negro font-principal placeholder:text-negro border-0'
            />
            <InputError message={errors.password_confirmation} />
          </div>

          <Button
            type='submit'
            className='hover:bg-amarillo text-blanco font-principal hover:text-negro mt-4 w-full cursor-pointer text-xl'
            tabIndex={5}
            disabled={processing}
          >
            {processing && <LoaderCircle className='h-4 w-4 animate-spin' />}
            Crear cuenta
          </Button>
        </div>

        <div className='text-amarillo text-center text-sm'>
          Ya tienes una cuenta?{' '}
          <TextLink
            href={route('login')}
            tabIndex={6}
            className='text-blanco'
          >
            Inicia sesión
          </TextLink>
        </div>
      </form>
    </AuthLayout>
  )
}
