/* eslint-disable */
'use client'

import Button from "@/src/components/atoms/Button"
import TwoColumnsWrapper from "@/src/components/layouts/TwoColumnsWrapper"
import { PortableText } from "next-sanity"
import ImageWithCaption from "@/src/components/atoms/ImageWithCaption"
import ListItem from "@/src/components/atoms/ListItem"
import formatted from "@/src/components/atoms/formatted"
import style from "@/src/components/page.module.css"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useMobileNav } from "@/src/contexts/MobileNavContext"
import type { GetEventBySlugQueryResult } from "@/src/types/sanity.types"

export default function EventPageClient({
  event
}: {
  event: GetEventBySlugQueryResult
}) {
  const router = useRouter()
  const formattedEventId = formatted(event.id)
  
  const handleBackClick = () => {
    router.back()
  }
  const { setMobileLeftExtras, setMobileMiddleExtras } = useMobileNav();
  
    useEffect(() => {
      setMobileLeftExtras(
        <Button onClick={handleBackClick}>Back</Button>
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
    <TwoColumnsWrapper padFirst>
      <div>
      <div className={style.buttonContainer}>
        <Button onClick={handleBackClick}>Back</Button>
      </div>
      <dl className={style.properties}>
      <dt>#</dt><dd>{formattedEventId}</dd>
      <dt>Event</dt><dd>{event?.title || ""}</dd>
      <dt>Date</dt><dd>{event?.date || ""}</dd>
      <dt>Springs</dt><dd>
      {event?.springs?.length > 0 ? (
                  event.springs.map((spring, index) => (
                    <ListItem key={index} href={`/springs/${spring.slug}`} id={formatted(spring.id)} content={spring.name}></ListItem>
                  ))
                ) : (
                  ""
                )}
      </dd>
      </dl>
      <PortableText 
          value={event?.description}
          components={{
            block: {
             normal: ({ children }) => <p>{children}</p>}}} />
      </div>
      <div>
        {event?.images && event.images.map((img, i) => (
          <ImageWithCaption 
            key={i}
            file={img.file}
            caption={img.caption}
            allImages={event.images}
            index={i}
            title={event.title || "Event Gallery"}
          />
        ))}
      </div>
    </TwoColumnsWrapper>
  )
}
