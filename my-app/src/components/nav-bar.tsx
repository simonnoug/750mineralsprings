'use client'
import Button from "./atoms/Button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from './nav-bar.module.css'
import LogoSrc2 from '../../public/750springsLOGO2.svg'
import LogoSrc1 from '../../public/750springsLOGO1.svg'



export default function NavBar() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__left}>
        <Button href="/friends" isActive={pathname === '/friends'}>FRIENDS</Button>
        <Button href="/springs" isActive={pathname === '/springs'}>SPRINGS</Button>
        <Button href="/events" isActive={pathname === '/events'}>EVENTS</Button>
      </div>
      <div className={styles.navbar__logo}>
        <Link href="/" className={`${styles.navbar__logoContainer} ${isHome ? styles['navbar__logoContainer--active'] : ''}`}>
          <LogoSrc1 className={styles.logo} role="img"  aria-label="Friends of the 750 Mineral Springs of Greece"/>
          <LogoSrc2 className={styles.logo} role="img"  aria-label="Friends of the 750 Mineral Springs of Greece"/>
        </Link>
      </div>
      <div className={styles.navbar__right}>
        <Button variant="noBorder" href="/support" isActive={pathname === '/support'}>Support us!</Button>
        <div>En</div>
      </div>
    </nav>
  )
}
