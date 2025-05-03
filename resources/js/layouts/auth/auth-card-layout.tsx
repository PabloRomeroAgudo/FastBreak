import AppLogo from '@/components/app-logo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from '@inertiajs/react'
import { type PropsWithChildren } from 'react'

export default function AuthCardLayout({
  children,
  description,
}: PropsWithChildren<{
  name?: string
  description?: string
}>) {
  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='flex w-full max-w-md flex-col gap-6'>
        <Link
          href={route('home')}
          className='flex items-center gap-2 self-center font-medium'
        ></Link>

        <div className='flex flex-col gap-6'>
          <Card className='bg-negro rounded-xl'>
            <CardHeader className='text-amarillo items-center pt-8 text-center'>
              <CardTitle className='text-xl'>
                <AppLogo />
              </CardTitle>
              <CardDescription className='text-amarillo mt-3 max-w-70'>{description}</CardDescription>
            </CardHeader>
            <CardContent className='text-amarillo px-10 py-8'>{children}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
