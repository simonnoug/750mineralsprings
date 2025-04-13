import "./globals.css"
import type { Metadata } from "next"
import { Source_Serif_4 } from "next/font/google"
import NavBar from "@/src/components/nav-bar"
import type React from "react"

const sourceSerif = Source_Serif_4({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Friends of the 750 Mineral Springs of Greece",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${sourceSerif.className} min-h-screen bg-white`}>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  )
}

