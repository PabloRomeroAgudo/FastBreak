import AppLayoutTemplate from '@/layouts/app/app-header-layout'
import { type BreadcrumbItem } from '@/types'
import { type ReactNode } from 'react'

interface AppLayoutProps {
  children: ReactNode
  breadcrumbs?: BreadcrumbItem[]
  subtitulo: string
  needBack?: boolean
  url?: string
}

export default ({ children, breadcrumbs, subtitulo, needBack = false, url, ...props }: AppLayoutProps) => (
  <AppLayoutTemplate
    breadcrumbs={breadcrumbs}
    {...props}
    subtitulo={subtitulo}
    needBack={needBack}
    url={url}
  >
    {children}
  </AppLayoutTemplate>
)
