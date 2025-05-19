// components/Footer.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './footer.module.css'

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false)

  // 1. define variants
  const panelVariants = {
    closed: {
      opacity: 0,
      y: 70,
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
        className={styles.aboutPanel}
        variants={panelVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
      >
        <div className={styles.container}>
          Website design: <i>Jason Faulter</i><br />
          Website development: <i>Simon Nougué</i><br />
          © Friends of the 750 Mineral Springs of Greece <br />
        <a href='https://www.mapbox.com/about/maps/' target='_blank'>Maps &copy; Mapbox &copy; OpenStreetMap</a>
        </div>
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