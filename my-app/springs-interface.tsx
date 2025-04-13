"use client"

import { useState, useEffect } from "react"

const springNames = [
  "Methana",
  "Aix-les-Bains",
  "Baden-Baden",
  "Karlovy Vary",
  "Pamukkale",
  "Blue Lagoon",
  "Saturnia",
  "Banff Upper Hot Springs",
  "Kusatsu Onsen",
  "Heviz",
]

const allFilters = ["SULFUR", "ALCALINE", "PRIVATE", "PUBLIC"]

export default function SpringsInterface() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [springs, setSprings] = useState<string[]>(springNames)

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  // Simulate filtering effect
  useEffect(() => {
    if (activeFilters.length === 0) {
      setSprings(springNames)
    } else {
      const filteredSprings = springNames.filter((_, index) => index % 2 === 0)
      setSprings(filteredSprings)
    }
  }, [activeFilters])

  // Reorder filters
  const orderedFilters = [...activeFilters, ...allFilters.filter((filter) => !activeFilters.includes(filter))]

  return (
    <div className="min-h-screen bg-[#67C6F5]">
      {/* Navigation Bar */}
      <div className="grid grid-cols-3 border border-neutral-200 border-black bg-white text-sm dark:border-neutral-800">
        <button className="p-4 text-center border-r border-black">SPRINGS</button>
        <button className="p-4 text-center border-r border-black">NEWS</button>
        <button className="p-4 text-center">ABOUT</button>
      </div>

      {/* Filter Panel and Springs List */}
      <div className="p-6">
        <div className="w-64">
          {/* Floating Filter Menu */}
          <div className="mb-2">
            <div className="flex flex-wrap gap-[1px]">
              {orderedFilters.map((filter) => (
                <button
                  key={filter}
                  className={`
                    px-3 py-1 bg-white border border-black flex items-center
                    ${activeFilters.includes(filter) ? "bg-gray-200" : ""}
                  `}
                  onClick={() => toggleFilter(filter)}
                >
                  {filter}
                  {activeFilters.includes(filter) ? (
                    <span className="ml-2 text-lg leading-none">&times;</span>
                  ) : (
                    <span className="ml-2 text-lg leading-none">+</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Springs List Box */}
          <div className="bg-white border border-neutral-200 border-black dark:border-neutral-800">
            <div className="max-h-64 overflow-y-auto">
              {springs.map((spring, index) => (
                <div key={index} className="px-4 py-2 border-b border-black last:border-b-0">
                  {spring}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

