"use client"

import { useState, useEffect } from "react"
import { FILTER_TYPES } from "@/src/constants"
import FilterMenu from "@/src/components/FilterMenu"
import SpringsList from "@/src/components/SpringsList"
import type { Spring } from "@/src/types/spring"
import { getSprings } from '@/src/lib/sanity'
import dynamic from "next/dynamic";

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
    <div style={{ 
      display: 'flex', 
      height: 'calc(100vh - 64px)', 
      width: '100%',
      overflow: 'hidden'
    }}>
      {/* Left column: Filter + List */}
      <div style={{ 
        width: '30%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRight: '1px solid #e0e0e0',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '16px' }}>
          <FilterMenu
            activeFilters={activeFilters}
            allFilters={FILTER_TYPES}
            onToggleFilter={toggleFilter}
          />
        </div>
        <div style={{ 
          flexGrow: 1, 
          overflowY: 'auto',
          padding: '0 16px 16px 16px'
        }}>
          <SpringsList springs={filteredSprings} />
        </div>
      </div>

      {/* Right column: Map */}
      <div style={{ 
        width: '70%', 
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
    </div>
  )
}