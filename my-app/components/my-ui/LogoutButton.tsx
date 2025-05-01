'use client'

import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Button } from '../ui/button'

interface LogoutButton {
    className?: string;
}

export default function LogoutButton({ className }: LogoutButton) {
  const router = useRouter()

  const handleLogout = async () => {
    await axios.post('/api/logout')
    router.push('/login')
  }

  return (
    <Button onClick={handleLogout} className={className} variant="ghost">
      Sair
    </Button>
  )
}
