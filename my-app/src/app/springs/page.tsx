"use client"

import { useState, useEffect } from "react"
import { FILTER_TYPES } from "@/src/constants"
import FilterMenu from "@/src/components/FilterMenu"
import SpringsList from "@/src/components/SpringsList"
import type { Spring } from "@/src/types/spring"
import { getSprings } from '@/src/lib/sanity'
import dynamic from "next/dynamic";
import TwoColumnsWrapper from "@/src/components/layouts/TwoColumnsWrapper"

const DynamicMap = dynamic(() => import("@/src/components/Map"), {
  ssr: false, // Prevents it from rendering on the server
});

export default function Home() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [springs, setSprings] = useState<Spring[]>([])
  const [filteredSprings, setFilteredSprings] = useState<Spring[]>([])

  useEffect(() => {
    const fetchSprings = async () => {
      const fetchedSprings = await getSprings()
      setSprings(fetchedSprings)
      setFilteredSprings(fetchedSprings)
    }
    fetchSprings()
  }, [])

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => 
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    )
  }

  useEffect(() => {
    if (activeFilters.length === 0) {
      setFilteredSprings(springs)
    } else {
      const filtered = springs.filter((spring) => 
        activeFilters.some(filter => {
          // Add console.log to debug values
          
          if (["SULFUR", "ALCALINE"].includes(filter)) {
            return spring.waterType?.toUpperCase() === filter;
          }
          if (["PRIVATE", "PUBLIC"].includes(filter)) {
            return spring.accessibility?.toUpperCase() === filter;
          }
          return false;
        })
      );
      setFilteredSprings(filtered)
    }
  }, [activeFilters, springs])

  return (
    <TwoColumnsWrapper padFirst reverseOnMobile>
      {/* Left column: Filter + List */}
      <div>
        <div>
          <FilterMenu
            activeFilters={activeFilters}
            allFilters={FILTER_TYPES}
            onToggleFilter={toggleFilter}
          />
        </div>
        <div>
          <SpringsList springs={filteredSprings} />
        </div>
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
          <DynamicMap springs={filteredSprings} />
        </div>
      </div>
    </TwoColumnsWrapper>
  )
}