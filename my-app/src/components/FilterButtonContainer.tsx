"use client"

import FilterUI from "./FilterUI"
import Button from "./atoms/Button"
import styles from "./FilterButtonContainer.module.css"
import { motion } from "framer-motion"

type FilterButtonContainerProps = {
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
}

export default function FilterButtonContainer({ 
  isFilterOpen, 
  setIsFilterOpen 
}: FilterButtonContainerProps) {
  // Animation variants for slide-in effect
  const filterVariants = {
    hidden: { 
      x: "-100%",
      opacity: 1 
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    exit: {
      x: "-100%",
      opacity: 1,
      transition: {
        ease: "easeInOut",
        duration: 0.3
      }
    }
  };

  return (
    <div 
      className={styles.filterButtonContainer}
    >
      <div className={styles.filterButton} onClick={() => setIsFilterOpen(!isFilterOpen)} >
        <Button isActive={isFilterOpen} variant="secondary">
          Filters
        </Button>
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: isFilterOpen ? -45 : 0 }}
          style={{fontSize: '1.2rem'}}>
          +
        </motion.div>
      </div>
      <motion.div 
        className={styles.filterUI}
        initial="hidden"
        animate={isFilterOpen ? "visible" : "exit"}
        variants={filterVariants}
      >
        <FilterUI />
      </motion.div>
    </div>
  )
}
