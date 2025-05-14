// components/atoms/ImageWithCaption.tsx
import React from 'react'
import Image from 'next/image'
import styles from './ImageWithCaption.module.css'
import { urlForImage } from '@/src/lib/sanityImageUrl'

export interface ImageWithCaptionProps {
  /** Image source URL or static import */
  file: any
  /** Accessible alt text */
  caption: string
}

export const ImageWithCaption: React.FC<ImageWithCaptionProps> = ({
    file,
    caption,
}) => {
    return (
        <figure className={styles.imageWithCaption}>
            <div className={styles.imageWithCaption__imageContainer}>
                <Image
                    src={urlForImage(file).url()}
                    alt={caption || ''}
                    className={styles.imageWithCaption__image}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    width={1200}
                    height={800}
                    style={{ width: '100%', height: 'auto' }}
                    priority
                />
            </div>
            {caption && (
                <figcaption className={styles.imageWithCaption__caption}>
                    {caption}
                </figcaption>
            )}
        </figure>
    )
}

export default ImageWithCaption