import { Breadcrumbs } from '@/components/breadcrumbs'
import { Icon } from '@/components/icon'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { getPrice2Decimals } from '@/lib/utils'
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import { ClipboardList, Euro, LogOut, Menu, Plus, ShoppingCart, StickyNote } from 'lucide-react'
import AppLogo from './app-logo'
import Subtitle from './subtitle'

type NavItemNotAuth = {
  title: string
  url: string
  style: string
}

interface AppHeaderProps {
  breadcrumbs?: BreadcrumbItem[]
  subtitulo: string
  needBack?: boolean
  url?: string
}

export function AppHeader({ breadcrumbs = [], subtitulo, needBack = false, url = '' }: AppHeaderProps) {
  const page = usePage<SharedData>()
  const { auth } = page.props

  const rightNavItems: NavItem[] = [
    {
      hasPermission: auth.user && auth.user.esAdmin,
      title: 'Añadir categoria',
      url: route('categoria.create'),
      icon: Plus,
      isIcon: true,
      method: 'get',
    },
    {
      hasPermission: true,
      title: 'Carrito',
      url: route('carrito'),
      icon: ShoppingCart,
      isIcon: true,
      method: 'get',
    },
    {
      hasPermission: true,
      title: 'Pedidos',
      url: '/pedidos',
      icon: StickyNote,
      isIcon: true,
      method: 'get',
    },
    {
      hasPermission: auth.user && !auth.user.esUsuario,
      title: 'Añadir saldo',
      url: route('saldo'),
      icon: Euro,
      isIcon: true,
      method: 'get',
    },
    {
      hasPermission: auth.user && !auth.user.esUsuario,
      title: 'Pedidos a preparar',
      url: route('preparar'),
      icon: ClipboardList,
      isIcon: true,
      method: 'get',
    },
    {
      hasPermission: true,
      title: 'Perfil',
      url: '/settings/profile',
      isIcon: false,
      method: 'get',
    },
    {
      hasPermission: true,
      title: 'Cerrar Sesión',
      url: route('logout'),
      icon: LogOut,
      isIcon: true,
      method: 'post',
    },
  ]

  const rightNavItemsNotAuth: NavItemNotAuth[] = [
    {
      title: 'Iniciar Sesión',
      url: route('login'),
      style: 'text-negro bg-amarillo p-2 rounded-sm text-lg font-medium font-principal text-center hover:bg-primary/90 hover:text-blanco ',
    },
    {
      title: 'Regístrate',
      url: route('register'),
      style: 'text-blanco bg-negro w-20  text-center rounded-sm hover:text-amarillo font-principal',
    },
  ]

  return (
    <>
      <div className='border-sidebar-border/80 bg-negro'>
        <div className='mx-auto flex h-16 items-center justify-between px-4'>
          <AppLogo />

          {/* Desktop Navigation */}
          <div className='flex items-center'>
            <div className='relative flex items-center'>
              <div className='hidden md:flex'>
                {auth.user ? (
                  <div className='flex items-center gap-2'>
                    <span className='text-blanco font-principal cursor-default rounded-sm'>Saldo: {getPrice2Decimals(auth.user.saldo)}€</span>
                    {rightNavItems.map(
                      (item) =>
                        item.hasPermission &&
                        (item.isIcon ? (
                          <TooltipProvider
                            key={item.title}
                            delayDuration={0}
                          >
                            <Tooltip>
                              <TooltipTrigger asChild>
                                {/* El problema es que daba que estabamos declarando un boton dentro de otro. Chati ha dicho:
                                Para resolver este problema, puedes utilizar la propiedad asChild proporcionada por Radix UI en el componente <TooltipTrigger>. Esta propiedad permite que el componente delegue su comportamiento al primer hijo que se le pase, evitando así que se renderice un <button> adicional. De esta manera, el <Link> de Inertia será el único elemento interactivo, y no habrá anidación de botones. STACK OVERFLOW: This will not render the default DOM element of SheetTrigger. Instead, it will render the child component <Button> and will pass the props and behaviour of <SheetTrigger> to make it functional.*/}
                                <Link
                                  method={item.method}
                                  href={item.url}
                                  className='group ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring text-amarillo inline-flex size-9 cursor-pointer items-center justify-center rounded-md bg-transparent text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'
                                >
                                  <span className='sr-only'>{item.title}</span>
                                  {item.icon && (
                                    <Icon
                                      iconNode={item.icon}
                                      className='size-6 opacity-80 group-hover:opacity-100'
                                    />
                                  )}
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{item.title}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          <TooltipProvider
                            key={item.title}
                            delayDuration={0}
                          >
                            <Tooltip>
                              <TooltipTrigger>
                                <Link
                                  method={item.method}
                                  href={item.url}
                                  className='group ring-offset-background hover:bg-accent text-blanco hover:text-negro focus-visible:ring-ring ml-1 flex h-9 items-center justify-center rounded-md bg-transparent p-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'
                                >
                                  <span className='whitespace-nowrap'>
                                    {auth.user.name} \ {auth.user.id}
                                  </span>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>
                                <span>{item.title}</span>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )),
                    )}
                  </div>
                ) : (
                  <div className='flex items-center gap-4'>
                    {rightNavItemsNotAuth.map((item) => (
                      <Link
                        href={item.url}
                        className={item.style}
                        key={item.title}
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
          <div className='md:hidden'>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant='link'
                  size='icon'
                  className='text-amarillo h-[34px] w-[34px]'
                >
                  <Menu className='text-amarillo h-5 w-5' />
                </Button>
              </SheetTrigger>
              <SheetContent
                side='left'
                className='bg-negro flex h-full w-64 flex-col items-stretch justify-between'
              >
                <SheetTitle className='sr-only'>Menu de navegacion</SheetTitle>
                <SheetHeader className='flex justify-start text-left'>
                  <AppLogo />
                </SheetHeader>
                <div className='text-amarillo flex h-full flex-1 flex-col space-y-4 p-4'>
                  <div className='flex h-full flex-col justify-between text-sm'>
                    <div className='flex flex-col space-y-4'></div>

                    <div className='flex flex-col space-y-4'>
                      {auth.user ? (
                        <>
                          <span className='text-blanco ml-2 cursor-default rounded-sm font-medium'>Saldo: {getPrice2Decimals(auth.user.saldo)}€</span>

                          {rightNavItems.map(
                            (item) =>
                              item.hasPermission &&
                              (item.isIcon ? (
                                <Link
                                  method={item.method}
                                  key={item.title}
                                  href={item.url}
                                  className='active:bg-accent flex w-fit items-center p-2 font-medium active:rounded-sm'
                                >
                                  {item.icon && (
                                    <Icon
                                      iconNode={item.icon}
                                      className='mr-3 h-5 w-5'
                                    />
                                  )}
                                  <span>{item.title}</span>
                                </Link>
                              ) : (
                                <Link
                                  method={item.method}
                                  key={item.title}
                                  href={item.url}
                                  className='text-blanco active:bg-accent flex w-fit items-center p-2 font-medium active:rounded-sm'
                                >
                                  <span>
                                    {auth.user.name} \ {auth.user.id}
                                  </span>
                                </Link>
                              )),
                          )}
                        </>
                      ) : (
                        <div className='flex flex-col space-y-4'>
                          {rightNavItemsNotAuth.map((item) => (
                            <Link
                              href={item.url}
                              className={item.style}
                              key={item.title}
                            >
                              <span>{item.title}</span>
                            </Link>
                          ))}
                        </div>
                      )}
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
