import { Head, useForm } from '@inertiajs/react'
import { LoaderCircle } from 'lucide-react'
import { FormEventHandler } from 'react'

import InputError from '@/components/input-error'
import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AuthLayout from '@/layouts/auth-layout'

type LoginForm = {
  email: string
  password: string
  remember: boolean
}

interface LoginProps {
  status?: string
  canResetPassword: boolean
  redirect: Redirect
}

type Redirect = {
  link: string
  parametros: unknown
}

export default function Login({ status, canResetPassword, redirect }: LoginProps) {
  const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
    email: '',
    password: '',
    remember: false,
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route('login', { redirect }), {
      onFinish: () => reset('password'),
    })
  }

  return (
    <AuthLayout description=''>
      <Head title='Log in' />
      <form
        className='flex flex-col gap-6'
        onSubmit={submit}
      >
        <div className='grid gap-13'>
          <Input
            id='email'
            type='email'
            required
            autoFocus
            tabIndex={1}
            autoComplete='email'
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            placeholder='Email'
            className='bg-amarillo text-negro font-principal placeholder:text-negro border-0'
          />
          <InputError message={errors.email} />

          <div className='grid gap-2'>
            <Input
              id='password'
              type='password'
              required
              tabIndex={2}
              autoComplete='current-password'
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              placeholder='Contraseña'
              className='bg-amarillo text-negro font-principal placeholder:text-negro border-0'
            />
            <InputError message={errors.password} />
            <div className='flex items-center'>
              {canResetPassword && (
                <TextLink
                  href={route('password.request')}
                  className='text-blanco ml-auto text-sm'
                  tabIndex={5}
                >
                  Olvidaste la contraseña?
                </TextLink>
              )}
            </div>
          </div>

          <div className='flex items-center space-x-3'>
            <Checkbox
              id='remember'
              name='remember'
              checked={data.remember}
              onClick={() => setData('remember', !data.remember)}
              tabIndex={3}
            />
            <Label htmlFor='remember'>Recuérdame</Label>
          </div>

          <Button
            type='submit'
            className='bg-amarillo text-negro font-principal hover:text-blanco mt-4 w-full cursor-pointer text-xl'
            tabIndex={4}
            disabled={processing}
          >
            {processing && <LoaderCircle className='h-4 w-4 animate-spin' />}
            INICIAR SESIÓN
          </Button>
        </div>

        <div className='text-amarillo text-center text-sm'>
          No tienes una cuenta?{' '}
          <TextLink
            href={route('register')}
            tabIndex={5}
            className='text-blanco'
          >
            Regístrate
          </TextLink>
        </div>
      </form>

      {status && <div className='mb-4 text-center text-sm font-medium text-green-600'>{status}</div>}
    </AuthLayout>
  )
}
