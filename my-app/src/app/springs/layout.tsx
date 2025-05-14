"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import TwoColumnsWrapper from "@/src/components/layouts/TwoColumnsWrapper"
import { SpringProvider } from "@/src/contexts/SpringContext"
import { getSprings } from '@/src/lib/sanity'
import type { Spring } from "@/src/types/spring"

const DynamicMap = dynamic(() => import("@/src/components/Map"), {
  ssr: false, // Prevents it from rendering on the server
});

export default function SpringsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [springs, setSprings] = useState<Spring[]>([])

  useEffect(() => {
    const fetchSprings = async () => {
      const fetchedSprings = await getSprings()
      setSprings(fetchedSprings)
    }
    fetchSprings()
  }, [])

  return (
    <SpringProvider springs={springs}>
      <TwoColumnsWrapper padFirst reverseOnMobile>
        {/* Left column: Children content (filter + list) */}
        <div>
          {children}
        </div>

        {/* Right column: Map */}
        <div style={{ 
          width: '100%', 
          height: '100%',
          position: 'relative'
        }}>
          <div style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}>
            <DynamicMap />
          </div>
        </div>
      </TwoColumnsWrapper>
    </SpringProvider>
  )
}