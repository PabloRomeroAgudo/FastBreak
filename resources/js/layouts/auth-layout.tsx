import AuthLayoutTemplate from '@/layouts/auth/auth-card-layout'

export default function AuthLayout({ children, description, ...props }: { children: React.ReactNode; description: string }) {
  return (
    <AuthLayoutTemplate
      description={description}
      {...props}
    >
      {children}
    </AuthLayoutTemplate>
  )
}
