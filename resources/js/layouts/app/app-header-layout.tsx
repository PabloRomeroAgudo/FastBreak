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
    </AppShell>
  )
}
