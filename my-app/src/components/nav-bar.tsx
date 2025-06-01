'use client'
import Button from "./atoms/Button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from './nav-bar.module.css'
import LogoSrc2 from '../../public/750springsLOGO2.svg'
import LogoSrc1 from '../../public/750springsLOGO1.svg'
import BurgerMenu from "./BurgerMenu"
import { useMobileNav } from "../contexts/MobileNavContext"

export default function NavBar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const pageName = pathname === '/' ? 'HOME' : pathname.slice(1).toUpperCase()

  const { mobileLeftExtras, mobileMiddleExtras } = useMobileNav()
  return (
    <nav className={styles.navbar}>
      {/* ─── Desktop‐only row ─── */}
      <div className={styles.navbar__left}>
        <Button href="/friends" isActive={pathname === '/friends'}>FRIENDS</Button>
        <Button href="/springs" isActive={pathname === '/springs'}>SPRINGS</Button>
        <Button href="/events" isActive={pathname === '/events'}>EVENTS</Button>
      </div>

      <div className={styles.navbar__logo}>
        <Link
          href="/"
          className={`${styles.navbar__logoContainer} ${
            isHome ? styles['navbar__logoContainer--active'] : ''
          }`}
        >
          <LogoSrc1 className={styles.logo} role="img" aria-label="Friends of the 750 Mineral Springs of Greece" />
          <LogoSrc2 className={styles.logo} role="img" aria-label="Friends of the 750 Mineral Springs of Greece" />
        </Link>
      </div>

      <div className={styles.navbar__right}>
        <Button variant="noBorder" href="/support" isActive={pathname === '/support'}>
          Support us!
        </Button>
        <div>En</div>
      </div>

      {/* ─── Mobile‐only second row ─── */}
      <div className={styles.navbar__mobileRow}>
      {mobileLeftExtras ? (
        <div className={styles.navbar__mobileLeftExtras}>
          {mobileLeftExtras}
        </div>
      ) : (
        <span className={styles.navbar__pageName}>{pageName}</span>
      )}
      {mobileMiddleExtras && (
        <span className={styles.navbar__pageName}>{mobileMiddleExtras}</span>
      )}
        <BurgerMenu />
      </div>
    </nav>
  )
}