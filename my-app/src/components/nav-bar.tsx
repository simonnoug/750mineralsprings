'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavBar() {
  const pathname = usePathname()

  return (
    <nav>
      <Link
      href="/springs"
      >
      SPRINGS
      </Link>
      <Link
      href="/events"
      >
      EVENTS
      </Link>
      <Link href="/friends">
      FRIENDS
      </Link>
    <Link href="/">
      <img src="/Component 186 – 1.svg" alt="Logo" />
    </Link>
    <Link href="/support">
      Support us!
      </Link>
    </nav>
  )
}

