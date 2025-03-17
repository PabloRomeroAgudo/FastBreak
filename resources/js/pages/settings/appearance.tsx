import { Head } from '@inertiajs/react'

import AppearanceTabs from '@/components/appearance-tabs'
import HeadingSmall from '@/components/heading-small'
import { type BreadcrumbItem } from '@/types'

import AppLayout from '@/layouts/app-layout'
import SettingsLayout from '@/layouts/settings/layout'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Appearance settings',
    href: '/settings/appearance',
  },
]

export default function Appearance() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title='Apariencia' />

      <SettingsLayout>
        <div className='space-y-6'>
          <HeadingSmall title='Apariencia' description='Actualiza la apariencia' />
          <AppearanceTabs />
        </div>
      </SettingsLayout>
    </AppLayout>
  )
}
