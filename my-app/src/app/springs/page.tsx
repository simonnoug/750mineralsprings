"use client"

import { useState } from "react"
import SpringsList from "@/src/components/SpringsList"
import FilterUI from "@/src/components/FilterMenu"
import Button from "@/src/components/atoms/Button"

export default function SpringsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsFilterOpen(!isFilterOpen)}>
        {isFilterOpen ? "Close Filters" : "Open Filters"}
      </Button>
      {isFilterOpen ? (
        <FilterUI />
      ) : (
        <SpringsList />
      )}
    </>
  )
}