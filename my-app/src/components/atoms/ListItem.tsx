import Link from 'next/link'
import styles from './ListItem.module.css'

type ListItemProps = {
  href?: string
  content?: string
  id?: string
}

export default function ListItem({
  href,id,content
}: ListItemProps) {

    return (
        <Link href={href} className={styles.ListItem}>
            <div className={styles.ListItem__id}>{id}</div> 
            <div className={styles.ListItem__content}>{content}</div> 
        </Link>
    )}