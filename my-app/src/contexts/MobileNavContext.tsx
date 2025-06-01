"use client"
import { createContext, useContext, useState, ReactNode } from "react"

type MobileExtras = ReactNode | null

interface MobileNavContextType {
  mobileLeftExtras: MobileExtras
  mobileMiddleExtras: MobileExtras
  setMobileLeftExtras: (content: MobileExtras) => void
  setMobileMiddleExtras: (content: MobileExtras) => void
}

// 1) Create context with no-op defaults
const MobileNavContext = createContext<MobileNavContextType>({
  mobileLeftExtras: null,
  mobileMiddleExtras: null,
  setMobileLeftExtras: () => {},
  setMobileMiddleExtras: () => {}
})

// 2) Provider that lives in your Layout
export function MobileNavProvider({ children }: { children: ReactNode }) {
  const [mobileLeftExtras, setMobileLeftExtras] = useState<MobileExtras>(null)
  const [mobileMiddleExtras, setMobileMiddleExtras] = useState<MobileExtras>(null)
  return (
    <MobileNavContext.Provider
      value={{
        mobileLeftExtras,
        mobileMiddleExtras,
        setMobileLeftExtras,
        setMobileMiddleExtras
      }}
    >
      {children}
    </MobileNavContext.Provider>
  )
}

// 3) Hook that pages/components will use
export function useMobileNav() {
  return useContext(MobileNavContext)
}