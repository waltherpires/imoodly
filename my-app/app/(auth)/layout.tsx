import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (token) {
    redirect('/dashboard')
  }

  return <>{children}</>
}
