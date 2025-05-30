import { Link } from '@inertiajs/react'
import AppLogoIcon from './app-logo-icon'

export default function AppLogo() {
  return (
    <Link
      method='get'
      href='/categoria'
    >
      <div className='flex'>
        <div className='text-sidebar-primary-foreground flex aspect-square items-center justify-center rounded-md'>
          <AppLogoIcon className='text-amarillo size-10 fill-current dark:text-black' />
        </div>
        <div className='ml-1 grid items-center text-left text-3xl'>
          <span className='text-amarillo font-principal mb-0.5 truncate leading-none'>FastBreak</span>
        </div>
      </div>
    </Link>
  )
}
