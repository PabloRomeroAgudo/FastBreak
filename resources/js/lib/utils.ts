import { router } from '@inertiajs/react'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function goToUrlWithRedirect(url: string, { redirect }: { redirect: string }) {
  router.get(route(url, { redirect: redirect }))
}
