'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavBar() {
  const pathname = usePathname()

  return (
    <>
    <div>Spring activities: Kammena Vourla, 18.05.2025</div>
    <nav>
    <Link className="button" href="/friends">
      FRIENDS
    </Link>
    <Link className="button" href="/springs">
      SPRINGS
    </Link>
    <Link className="button" href="/events">
      EVENTS
      </Link>
  
    <Link href="/">
      <img src="/Component 186 – 1.svg" alt="Logo" />
    </Link>
    <Link className="button" href="/support">
      Support us!
      </Link>
    </nav>
    </>
  )
}

