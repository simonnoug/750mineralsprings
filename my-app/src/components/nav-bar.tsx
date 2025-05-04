'use client'
import Button from "./atoms/Button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from './nav-bar.module.css'


export default function NavBar() {
  const pathname = usePathname()

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__left}>
        <Button href="/friends" isActive={pathname === '/friends'}>FRIENDS</Button>
        <Button href="/springs" isActive={pathname === '/springs'}>SPRINGS</Button>
        <Button href="/events" isActive={pathname === '/events'}>EVENTS</Button>
      </div>
      <div className={styles.navbar__logo}>
        <Link href="/">
          <img src="/Component 186 – 1.svg" alt="Logo" />
        </Link>
      </div>
      <div className={styles.navbar__right}>
        <Button href="/support" isActive={pathname === '/support'}>Support us!</Button>
      </div>
    </nav>
  )
}

