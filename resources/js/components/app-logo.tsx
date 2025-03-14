import AppLogoIcon from './app-logo-icon'

export default function AppLogo() {
  return (
    <>
      <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
        <AppLogoIcon className="text-amarillo size-5 fill-current dark:text-black" />
      </div>
      <div className="ml-1 grid flex-1 text-left text-sm">
        <span className="text-amarillo mb-0.5 truncate leading-none font-semibold">FastBreak</span>
      </div>
    </>
  )
}
