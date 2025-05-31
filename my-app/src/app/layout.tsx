import "./globals.css"
import styles from "./layout.module.css"
import type { Metadata } from "next"
import { Source_Serif_4 } from "next/font/google"
import NavBar from "@/src/components/nav-bar"
import Footer from "@/src/components/footer"
import MarqueeHeader from '@/src/components/marquee'
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
      <body className={styles.layout}>
        <header className={styles.layout__header}>
          <MarqueeHeader />
          <NavBar />
        </header>
        <main className={styles.layout__main}>{children}</main>
        
        <div id="modal-root"/> 
      </body>
    </html>
  )
}

