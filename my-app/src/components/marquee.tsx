import Marquee from 'react-fast-marquee';
import styles from './marquee.module.css'
import { getMarquee } from '../lib/sanity';
import Link from 'next/link';

export default async function MarqueeHeader(){
    const marquee = await getMarquee()
    return (
        <div className={styles.marqueeHeader}>
        <Marquee className={styles.marqueeHeader__content}>
            <Link href={`/events/${marquee.link.slug.current}`}>{marquee.content}</Link>
        </Marquee>
        </div>
    )
}
