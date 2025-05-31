// components/atoms/ImageWithCaption.tsx
'use client';

import React from 'react'
import Image from 'next/image'
import styles from './ImageWithCaption.module.css'
import { urlForImage } from '@/src/lib/sanityImageUrl'
import { useState } from 'react'
import LightBox from './LightBox';

export interface ImageWithCaptionProps {
  /** Image source URL or static import */
  file: any
  /** Accessible alt text */
  caption: string
  /** All images for gallery view */
  allImages?: Array<{file: any, caption: string}>
  /** Index of this image in the gallery */
  index?: number
}

export const ImageWithCaption: React.FC<ImageWithCaptionProps> = ({
    file,
    caption,
    allImages = [],
    index = 0,
}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    
    // If allImages is provided, use it; otherwise, create a single-image array
    const galleryImages = allImages.length > 0 
        ? allImages.map(img => img.file) 
        : [file];
    
    const galleryCaptions = allImages.length > 0
        ? allImages.map(img => img.caption || '')
        : [caption || ''];
    
    return (
        <>
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
                    onClick={() => setIsModalOpen(true)}
                />
            </div>
            {caption && (
                <figcaption className={styles.imageWithCaption__caption}>
                    {caption}
                </figcaption>
            )}
        </figure>
        {isModalOpen && (
            <LightBox 
                images={galleryImages} 
                captions={galleryCaptions} 
                currentIndex={index} 
                onClose={() => setIsModalOpen(false)} 
            />
        )}
        </>
    )
}

export default ImageWithCaption