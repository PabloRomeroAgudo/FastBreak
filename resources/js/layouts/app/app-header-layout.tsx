import { AppContent } from '@/components/app-content'
import { AppHeader } from '@/components/app-header'
import { AppShell } from '@/components/app-shell'
import { SharedData, type BreadcrumbItem } from '@/types'
import { usePage } from '@inertiajs/react'
import type { PropsWithChildren } from 'react'

export default function AppHeaderLayout({
  children,
  breadcrumbs,
  subtitulo,
  needBack,
  url,
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[]; subtitulo: string; needBack?: boolean; url?: string }>) {
  const { name } = usePage<SharedData>().props
  return (
    <AppShell>
      <AppHeader
        breadcrumbs={breadcrumbs}
        subtitulo={subtitulo}
        needBack={needBack}
        url={url}
      />
      <AppContent>{children}</AppContent>

      <footer className='border-negro font-principal mx-5 mt-3 grid min-h-20 items-center self-stretch border-t text-center md:mx-10'>
        💛❤️Hecho con amor por los desarrolladores de {name} ❤️💛
      </footer>
    </AppShell>
  )
}
