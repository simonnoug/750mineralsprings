// components/Footer.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from '../styles/footer.module.css'

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false)

  // 1. define variants
  const panelVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <footer className={styles.footer}>
      {/* 2. motion.div with variants */}
      <motion.div
        className={`${styles.aboutPanel} ${isOpen ? styles.aboutPanelOpen : ''}`}
        variants={panelVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
      >
        <p>
          Website design: Jason Faulter<br />
          Website development: Simon Nougué<br />
          © Friends of the 750 Mineral Springs of Greece
        </p>
      </motion.div>

      {/* 3. clickable logo toggles isOpen */}
      <div
        className={styles.logo}
        onClick={() => setIsOpen(prev => !prev)}
      >
        ≈
      </div>
    </footer>
  )
}