'use client'

import Button from "@/src/components/atoms/Button"
import ListItem from "@/src/components/atoms/ListItem"
import { useSpringImage } from "@/src/contexts/SpringImageContext"
import { useSpringContext } from "@/src/contexts/SpringContext" 
import formatted from "@/src/components/atoms/formatted"
import style from "@/src/components/page.module.css"
import { useState } from "react"
import LightBox from "@/src/components/atoms/LightBox"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useMobileNav } from "@/src/contexts/MobileNavContext"

export default function SpringPage({ spring }: { spring: any }) {
	const router = useRouter()
	const { setActiveId } = useSpringContext() // Import from SpringContext
	const formattedId = formatted(spring.id)
	const { setSpringImage } = useSpringImage()
	const [isGalleryOpen, setIsGalleryOpen] = useState(false)
	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	const handleBackClick = () => {
		setActiveId(null) // Reset the active spring ID
		router.back() // Use browser history instead of hardcoded route
	}

	const openGallery = (index: number) => {
		setCurrentImageIndex(index)
		setIsGalleryOpen(true)
	}

	// Prepare gallery data
	const galleryImages = spring?.images?.map(img => img.file) || []
	const galleryCaptions = spring?.images?.map(img => img.title || '') || []

	
	  const { setMobileLeftExtras, setMobileMiddleExtras } = useMobileNav();
	  
		useEffect(() => {
		  setMobileLeftExtras(
			<Button onClick={handleBackClick} variant="mobileHeader">Back</Button>
		  );
		  setMobileMiddleExtras(
			null
		  );
		  return () => {
			setMobileLeftExtras(null);
			setMobileMiddleExtras(null);
		  };
		}, [setMobileLeftExtras, setMobileMiddleExtras]);

	return (
		<div>
			<div className={style.buttonContainer}>
				<Button onClick={handleBackClick}>Back</Button>
			</div>
			<dl className={style.properties}>
				<dt>#</dt>
				<dd>{formattedId}</dd>
				<dt>SPRING</dt>
				<dd>{spring?.name}</dd>
				<dt>EVENTS</dt>
				<dd>
					{spring?.events?.length > 0 ? (
						spring.events.map((event, index) => (
							<ListItem
								key={index}
								href={`/events/${event.slug}`}
								id={event.date}
								content={event.title}
							></ListItem>
						))
					) : (
						"No events"
					)}
				</dd>
				<dt>REGION</dt>
				<dd>{spring?.region}</dd>
				<dt>MUNICIPALITY</dt>
				<dd>{spring?.municipality}</dd>
				<dt>NOTE</dt>
				<dd>{spring?.note}</dd>
				<dt>OWNERSHIP</dt>
				<dd>{spring?.ownership?.longerOption}</dd>
				<dt>TREATMENTS</dt>
				<dd>{spring?.treatment}</dd>
				<dt onClick={() => openGallery(0)}>PHOTO</dt>
				<dd>
					{spring?.images?.length > 0 ? (
						spring.images.map((image, index) => (
							<div key={index}>
								<button 
									onClick={() => openGallery(index)}
									className={style.imageButton}
								>
									{image.title || `Image ${index + 1}`}
								</button>
							</div>
						))
					) : (
						"No images"
					)}
				</dd>
				<dt>LOCATION</dt>
				<dd>
					{spring?.location
						? `${spring.location.lat}, ${spring.location.lng}`
						: ""}
				</dd>
			</dl>

			{isGalleryOpen && (
				<LightBox
					images={galleryImages}
					captions={galleryCaptions}
					currentIndex={currentImageIndex}
					onClose={() => setIsGalleryOpen(false)}
					title={spring.name || "Spring Image Gallery"}
				/>
			)}
		</div>
	)
}
