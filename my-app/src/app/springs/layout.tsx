"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { useSpringContext } from "@/src/contexts/SpringContext"
import dynamic from "next/dynamic"
import TwoColumnsWrapper from "@/src/components/layouts/TwoColumnsWrapper"
import { SpringProvider } from "@/src/contexts/SpringContext"
import { getSprings } from '@/src/lib/sanity'
import type { Spring } from "@/src/types/spring"
import { SpringImageProvider, useSpringImage } from "@/src/contexts/SpringImageContext"
import ImageWithCaption from "@/src/components/atoms/ImageWithCaption"
import { Black_And_White_Picture } from "next/font/google"
import FilterButtonContainer from "@/src/components/FilterButtonContainer"


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

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <SpringProvider springs={springs}>
      <SpringImageProvider>
        {usePathname() === '/springs' && (
          <FilterButtonContainer 
            isFilterOpen={isFilterOpen} 
            setIsFilterOpen={setIsFilterOpen}
          />)}
        <TwoColumnsWrapper padFirst tabsOnMobile variant="springs">
          {/* Left column: Children content (filter + list) */}
          <div>{children}</div>
          <RightColumnContent/>
        </TwoColumnsWrapper>
          
        
        {usePathname() !== '/springs' && children}
      </SpringImageProvider>
    </SpringProvider>
  )
}

const DynamicMap = dynamic(() => import("@/src/components/Map"), { ssr: false })


function RightColumnContent() {
  const { filteredSprings } = useSpringContext()
  const pathname = usePathname()
  const slug = pathname?.split("/").pop()
  const mapRef = useRef<any>(null)
  const { springImage } = useSpringImage()

  useEffect(() => {
    if (!mapRef.current) return;
    // Reset to global view on the main /springs page
    if (slug === "springs") {
      mapRef.current?.zoomTo(23.803, 38.250, 5.7);
      return;
    }

    // Zoom to specific spring on detail pages
    if (slug) {
      const spring = filteredSprings.find(s => s.slug === slug);
      if (spring?.location) {
        mapRef.current?.zoomTo(spring.location.lng, spring.location.lat, 12);
      }
    }
  }, [slug, filteredSprings]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Persistent Map */}
      <div style={{ position: 'absolute', inset: 0, height: '100%',}}>
        <DynamicMap ref={mapRef} />
      </div>

      {/* Overlay Image Preview */}
      {springImage && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            backgroundColor: 'var(--main-bg-color)',
            overflow: 'auto',
          }}
        >
          <div style={{ maxWidth: '100%', display: 'block', margin: '0 auto' }}>
            <ImageWithCaption file={springImage.file} caption= ""/>
          </div>
        </div>
      )}
    </div>
  )
}