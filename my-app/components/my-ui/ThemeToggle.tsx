'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { SunMedium, Moon } from 'lucide-react'
import { Button } from '../ui/button'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="px-4 py-2"
    >
      {theme === 'dark' ? <SunMedium /> : <Moon />}
    </Button>
  )
}
