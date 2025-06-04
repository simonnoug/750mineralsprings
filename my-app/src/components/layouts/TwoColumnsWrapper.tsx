'use client'
import { ReactNode, Children } from 'react';
import styles from './TwoColumnsWrapper.module.css';
import { useState } from 'react';
import { useEffect } from 'react'
import { useMobileNav } from '@/src/contexts/MobileNavContext';
import Button from '../atoms/Button';
import { usePathname } from 'next/navigation';

type Props = {
  children: ReactNode
  reverseOnMobile?: boolean
  tabsOnMobile?: boolean;
  padFirst?: boolean;
  padSecond?: boolean;
  initialActiveIndex?: number; // New property
  variant?: 'springs' | 'default'; // New variant prop
};

export default function TwoColumnsWrapper({
  children,
  reverseOnMobile = false,
  tabsOnMobile = false,
  padFirst = false,
  padSecond = false,
  initialActiveIndex = 1, // Default to Map view (index 1)
  variant = 'default', // Default variant
}: Props) {
  const [first, second] = Children.toArray(children).slice(0, 2)
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const pathname = usePathname();
  
  // Add effect to detect spring pages and set activeIndex to 0
  useEffect(() => {
    // Check if we're on a spring detail page
    if (pathname && pathname.startsWith('/springs/') && pathname !== '/springs/') {
      console.log('Setting activeIndex to 0 for spring page:', pathname);
      setActiveIndex(0);
    } else if (activeIndex !== initialActiveIndex && !pathname?.startsWith('/springs/')) {
      // Reset to initial index for non-spring pages
      setActiveIndex(initialActiveIndex);
    }
  }, [pathname, initialActiveIndex, activeIndex]);
  
  const wrapperClasses = [
    styles['two-col'],
    reverseOnMobile && styles['two-col--reverse-mobile'],
    tabsOnMobile && styles['two-col--tabs-mobile'],
  ].filter(Boolean).join(' ');

  const firstClasses = [
    styles['two-col__column'],
    padFirst && styles['two-col__column--padded'],
    tabsOnMobile && activeIndex !== 0 && styles['two-col__column--hidden-mobile'],
  ].filter(Boolean).join(' ');

  const secondClasses = [
    styles['two-col__column'],
    padSecond && styles['two-col__column--padded'],
    tabsOnMobile && activeIndex !== 1 && styles['two-col__column--hidden-mobile'],
  ].filter(Boolean).join(' ');

  const { setMobileLeftExtras, setMobileMiddleExtras } = useMobileNav();
      
  useEffect(() => {
    // This will run on component mount and when pathname changes    
    if (tabsOnMobile && variant === 'springs') {
      setMobileMiddleExtras(
      <>
        <Button isActive={activeIndex === 0} onClick={() => setActiveIndex(0)} variant='mobileHeader'>List</Button>
        /
        <Button isActive={activeIndex === 1} onClick={() => setActiveIndex(1)} variant='mobileHeader'>Map</Button> 
      </>
      );
    } else {
      setMobileMiddleExtras(null);
    }
    
    return () => {
      setMobileMiddleExtras(null);
    };
  }, [setMobileLeftExtras, setMobileMiddleExtras, activeIndex, tabsOnMobile, pathname, variant]); // Add pathname as dependency

  return (
    <main className={wrapperClasses}>
      <div className={firstClasses}>{first}</div>
      <div className={secondClasses}>{second}</div>
    </main>
  )
}
