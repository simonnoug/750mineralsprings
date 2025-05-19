import Link from 'next/link'
import styles from './ListItem.module.css'

type ListItemProps = {
  href?: string
  content?: string
  id?: string
  isHovered?: boolean
}

export default function ListItem({
  href, id, content, isHovered = false,
}: ListItemProps) {

  const className = [
    styles.ListItem,
    isHovered ? styles['ListItem--hovered'] : '',
  ].filter(Boolean).join(' ')

  if (!href) {
    return (
      <div className={className}>
        <div className={styles.ListItem__id}>{id}</div> 
        <div className={styles.ListItem__content}>{content}</div> 
      </div>
    )
  }

  return (
    <Link href={href} className={className}>
      <div className={styles.ListItem__id}>{id}</div> 
      <div className={styles.ListItem__content}>{content}</div> 
    </Link>
  )
}