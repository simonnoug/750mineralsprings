"use client"

import { useState } from "react"
import SpringsList from "@/src/components/SpringsList"
import FilterUI from "@/src/components/FilterMenu"
import Button from "@/src/components/atoms/Button"
import styles from "@/src/components/page.module.css"
import { motion } from "framer-motion"

export default function SpringsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsFilterOpen(!isFilterOpen)} 
        className={styles.buttonContainer}
      >
        <Button isActive={isFilterOpen} variant="secondary">
          Filters
        </Button>
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: isFilterOpen ? 45 : 0 }}
          style={{fontSize: '1.2rem'}}>
          +
        </motion.div>
      </div>

      {isFilterOpen ? (
        <FilterUI />
      ) : (
        <SpringsList />
      )}
    </>
  )
}


/* const panelVariants = {
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

      <motion.div
        className={styles.aboutPanel}
        variants={panelVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
      ></motion.div>*/