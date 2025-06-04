/* eslint-disable */
'use client';

import styles from './LightBox.module.css';
import { createPortal } from 'react-dom'
import Button from './Button';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { urlForImage } from '@/src/lib/sanityImageUrl'

export interface LightBoxProps {
  /** All images available in the gallery */
  images: any[]
  /** Current image index */
  currentIndex: number
  /** Accessible alt text */
  captions: string[]
  /** Title to display in the header */
  title?: string
  onClose: () => void
}

export const LightBox: React.FC<LightBoxProps> = ({
  images,
  currentIndex: initialIndex,
  captions,
  title = '',
  onClose
}) => {
  const [mounted, setMounted] = useState(false);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));
    setMounted(true);
  }, []);

  if (!mounted || !modalRoot) return null;

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentFile = images[currentIndex];
  const currentCaption = captions[currentIndex];

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.modal__header}> 
          <div>{title}</div>
          <div className={styles.modal__counter}>
          {currentIndex + 1} / {images.length}
          </div>
          <Button onClick={onClose}>Close</Button>
      </div>
      <div className={styles.modal__content}>
        <button 
          className={styles.modal__navButton} 
          onClick={handlePrevious}
          aria-label="Previous image"
        >
          &lt;
        </button>
        
        <div className={styles.modal__imageContainer}>
          <Image
            src={urlForImage(currentFile).url()}
            alt={currentCaption || ''}
            className={styles.modal__image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            width={1200}
            height={800}
            priority
          />
        </div>
        
        <button 
          className={styles.modal__navButton} 
          onClick={handleNext}
          aria-label="Next image"
        >
          &gt;
        </button>
        
        {currentCaption && (
          <figcaption className={styles.modal__caption}>
            {currentCaption}
          </figcaption>
        )}
      </div>
    </div>,
    modalRoot
  );
};

export default LightBox;
