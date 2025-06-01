"use client"

import { useState } from "react"
import SpringsList from "@/src/components/SpringsList"
import FilterButtonContainer from "@/src/components/FilterButtonContainer"
import styles from "@/src/components/page.module.css"

export default function SpringsPage() {
  return (
    <>
      <SpringsList />
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