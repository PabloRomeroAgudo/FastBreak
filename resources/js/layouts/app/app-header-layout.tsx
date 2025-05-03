import { AppContent } from '@/components/app-content'
import { AppHeader } from '@/components/app-header'
import { AppShell } from '@/components/app-shell'
import { type BreadcrumbItem } from '@/types'
import type { PropsWithChildren } from 'react'

export default function AppHeaderLayout({
  children,
  breadcrumbs,
  subtitulo,
  needBack,
  url,
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[]; subtitulo: string; needBack?: boolean; url?: string }>) {
  return (
    <AppShell>
      <AppHeader
        breadcrumbs={breadcrumbs}
        subtitulo={subtitulo}
        needBack={needBack}
        url={url}
      />
      <AppContent>{children}</AppContent>

      <footer className='border-negro font-principal mt-3 min-h-20 w-7xl self-center border-t text-center'>esto es el footer</footer>
    </AppShell>
  )
}
