// src/contexts/SpringImageContext.tsx
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import type { SpringImage } from '@/src/types/spring' // adjust if named differently

type SpringImageContextType = {
  springImage: SpringImage | null
  setSpringImage: (image: SpringImage | null) => void
}

const SpringImageContext = createContext<SpringImageContextType | undefined>(undefined)

export function SpringImageProvider({ children }: { children: React.ReactNode }) {
  const [springImage, setSpringImage] = useState<SpringImage | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    setSpringImage(null)
  }, [pathname])
  
  return (
    <SpringImageContext.Provider value={{ springImage, setSpringImage }}>
      {children}
    </SpringImageContext.Provider>
  )
}

export function useSpringImage() {
  const context = useContext(SpringImageContext)
  if (!context) throw new Error('useSpringImage must be used within a SpringImageProvider')
  return context
}