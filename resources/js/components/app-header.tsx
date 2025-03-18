import { Breadcrumbs } from '@/components/breadcrumbs'
import { Icon } from '@/components/icon'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { getUrlNameWithRedirect } from '@/lib/utils'
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import { CircleUserRound, Menu, ShoppingCart } from 'lucide-react'
import AppLogo from './app-logo'
import AppLogoIcon from './app-logo-icon'
import Subtitle from './subtitle'

type NavItemNotAuth = {
  title: string
  url: string
  style: string
}
const rightNavItems: NavItem[] = [
  {
    title: 'Carrito',
    url: '/carrito',
    icon: ShoppingCart,
  },
  {
    title: 'Perfil',
    url: '/settings/profile',
    icon: CircleUserRound,
  },
]

const rightNavItemsNotAuth: NavItemNotAuth[] = [
  {
    title: 'Log in',
    url: 'login',
    style: 'text-negro bg-amarillo w-20 rounded-sm text-lg font-bold text-center',
  },
  {
    title: 'Sign in',
    url: 'register',
    style: 'text-blanco',
  },
]

interface AppHeaderProps {
  breadcrumbs?: BreadcrumbItem[]
  subtitulo: string
  needBack?: boolean
  url?: string
}

export function AppHeader({ breadcrumbs = [], subtitulo, needBack = false, url = '' }: AppHeaderProps) {
  const page = usePage<SharedData>()
  const { auth } = page.props
  const { url: currentURL } = page
  return (
    <>
      <div className='border-sidebar-border/80 bg-negro'>
        <div className='mx-auto flex h-16 items-center justify-between px-4'>
          <AppLogo />

          {/* Desktop Navigation */}
          {auth.user && <p className='text-blanco font-principal'>Saldo : {auth.user.saldo}</p>}
          <div className='flex items-center space-x-3'>
            <div className='relative flex items-center space-x-1'>
              <div className='hidden lg:flex'>
                {auth.user ? (
                  <>
                    {rightNavItems.map((item) => (
                      <TooltipProvider
                        key={item.title}
                        delayDuration={0}
                      >
                        <Tooltip>
                          <TooltipTrigger>
                            <a
                              href={item.url}
                              rel='noopener noreferrer'
                              className='group ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring text-amarillo ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent p-0 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'
                            >
                              <span className='sr-only'>{item.title}</span>
                              {item.icon && (
                                <Icon
                                  iconNode={item.icon}
                                  className='size-5 opacity-80 group-hover:opacity-100'
                                />
                              )}
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{item.title}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                    <Link
                      as='button'
                      method='post'
                      href='/logout'
                      className='text-amarillo'
                    >
                      Cerrar Sesión
                    </Link>
                  </>
                ) : (
                  <div className='flex items-center gap-4'>
                    {rightNavItemsNotAuth.map((item) => (
                      <Link
                        href={getUrlNameWithRedirect(item.url, { redirect: currentURL })}
                        className={item.style}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Mobile Menu */}
          <div className='lg:hidden'>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-[34px] w-[34px]'
                >
                  <Menu className='text-amarillo h-5 w-5' />
                </Button>
              </SheetTrigger>
              <SheetContent
                side='left'
                className='bg-sidebar flex h-full w-64 flex-col items-stretch justify-between'
              >
                <SheetTitle className='sr-only'>Navigation Menu</SheetTitle>
                <SheetHeader className='flex justify-start text-left'>
                  <AppLogoIcon className='h-6 w-6 fill-current text-black dark:text-white' />
                </SheetHeader>
                <div className='flex h-full flex-1 flex-col space-y-4 p-4'>
                  <div className='flex h-full flex-col justify-between text-sm'>
                    <div className='flex flex-col space-y-4'></div>

                    <div className='flex flex-col space-y-4'>
                      {rightNavItems.map((item) => (
                        <a
                          key={item.title}
                          href={item.url}
                          className='flex items-center space-x-2 font-medium'
                        >
                          {item.icon && (
                            <Icon
                              iconNode={item.icon}
                              className='h-5 w-5'
                            />
                          )}
                          <span>{item.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <Subtitle
        subtitulo={subtitulo}
        needBack={needBack}
        url={url}
      />
      {breadcrumbs.length > 1 && (
        <div className='border-sidebar-border/70 flex w-full border-b'>
          <div className='mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl'>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
        </div>
      )}
    </>
  )
}
