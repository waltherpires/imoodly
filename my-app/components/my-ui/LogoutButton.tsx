'use client'

import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Button } from '../ui/button'
import { useAuth } from '@/contexts/useAuth';

interface LogoutButton {
    className?: string;
}

export default function LogoutButton({ className }: LogoutButton) {
  const { setUserId } = useAuth();
  const router = useRouter()

  const handleLogout = async () => {
    await axios.post('/api/logout')
    setUserId(null);
    router.push('/login')
  }

  return (
    <Button onClick={handleLogout} className={className} variant="ghost">
      Sair
    </Button>
  )
}
