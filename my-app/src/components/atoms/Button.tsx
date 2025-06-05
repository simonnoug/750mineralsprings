import Link from 'next/link'
import styles from './Button.module.css'

type ButtonProps = {
  href?: string         // if present, render a Next.js Link
  onClick?: () => void  // if not, render a normal <button>
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'noBorder' | 'mobileHeader' | 'image' // optional BEM modifier
  isActive?: boolean      // ← new
}

export default function Button({
  href,
  onClick,
  children,
  variant = 'primary',
  isActive = false, 
}: ButtonProps) {
  const baseClass = styles.button
  const modClass  = styles[`button--${variant}`]
  const activeClass  = isActive ? styles['button--active'] : ''

  const className = [baseClass, modClass, activeClass].filter(Boolean).join(' ')

  if (href) {
    return (
      <Link href={href} className={`${className}`}>
        {children}
      </Link>
    )
  }
  return (
    <button onClick={onClick} className={`${className}`}>
      {children}
    </button>
  )
}