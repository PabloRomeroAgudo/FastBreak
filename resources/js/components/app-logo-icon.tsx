import { ImgHTMLAttributes } from 'react'

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src='/ico/favicon.svg'
      alt=''
      {...props}
    />
  )
}
