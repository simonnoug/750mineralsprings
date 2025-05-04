import Marquee from 'react-fast-marquee';
import styles from './marquee.module.css'

const MarqueeHeader = () => {
    return (
        <div className={styles.marqueeHeader}>
        <Marquee className={styles.marqueeHeader__content}>
            <div>Spring activities: Kammena Vourla, 18.05.2025</div>
        </Marquee>
        </div>
    )
}

export default MarqueeHeader