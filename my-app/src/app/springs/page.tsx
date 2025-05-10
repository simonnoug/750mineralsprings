"use client"

import { useState, useEffect } from "react"
import { FILTER_TYPES } from "@/src/constants"
import FilterMenu from "@/src/components/FilterMenu"
import SpringsList from "@/src/components/SpringsList"
import { getSprings } from '@/src/lib/sanity'
import dynamic from "next/dynamic";
import TwoColumnsWrapper from "@/src/components/layouts/TwoColumnsWrapper"
import { SpringProvider } from "@/src/contexts/SpringContext"
import FilterUI from "@/src/components/FilterMenu"
// Change this import to use the Spring type from types/spring
import type { Spring } from "@/src/types/spring"
import Button from "@/src/components/atoms/Button"

const DynamicMap = dynamic(() => import("@/src/components/Map"), {
  ssr: false, // Prevents it from rendering on the server
});



export default function Home() {
  const [springsFromSanity, setSprings] = useState<Spring[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchSprings = async () => {
      const fetchedSprings = await getSprings()
      setSprings(fetchedSprings)
    }
    fetchSprings()
  }, [])

  return (
    <SpringProvider springs={springsFromSanity}>
     <TwoColumnsWrapper padFirst reverseOnMobile>
      {/* Left column: Filter + List */}
      <div>
        <Button onClick={() => setIsFilterOpen(!isFilterOpen)}>
          {isFilterOpen ? "Close Filters" : "Open Filters"}
        </Button>
        {isFilterOpen ? (
            <FilterUI />
          ) : (
            <SpringsList />
          )}
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
          {/* Remove the springs prop as it will get data from context */}
          <DynamicMap />
        </div>
      </div>
    </TwoColumnsWrapper>
    </SpringProvider>
  )
}