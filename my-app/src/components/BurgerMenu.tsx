'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './atoms/Button'
import styles from './BurgerMenu.module.css'
import { usePathname } from 'next/navigation'

interface BurgerMenuProps {
  /** Optional additional className */
  className?: string
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ className = '' }) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  
  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  
  return (
    <div className={`${styles.burgerMenu} ${className}`}>
      <Button
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((prev) => !prev)}
        variant={'mobileHeader'}
      >
        Menu
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div 
            className={styles.burgerMenu__content}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
          >
            <div className={styles.burgerMenu__button}>
              <Button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                variant="mobileHeader">
                  Close
                </Button>
            </div>
            <div className={styles.burgerMenu__links}>
              <Button href="/friends" isActive={pathname === '/friends'}>FRIENDS</Button>
              <Button href="/springs" isActive={pathname === '/springs'}>SPRINGS</Button>
              <Button href="/events" isActive={pathname === '/events'}>EVENTS</Button>
              <Button variant="noBorder" href="/support" isActive={pathname === '/support'}>Support us!</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default BurgerMenu
