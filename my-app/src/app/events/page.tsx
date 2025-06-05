"use client"

import { useState, useEffect } from "react"
import { getEvents } from '@/src/lib/sanity'
import Link from "next/link"
import ListItem from "@/src/components/atoms/ListItem"
import TwoColumnsWrapper from "@/src/components/layouts/TwoColumnsWrapper"
import ImageWithCaption from "@/src/components/atoms/ImageWithCaption"
import styles from '@/src/components/page.module.css'
import { GetEventsQueryResult } from "@/src/types/sanity.types"

export default function Events() {
  const [events, setEvents] = useState<GetEventsQueryResult>([])
  const [eventImage, setEventImage] = useState<GetEventsQueryResult[number]["image"] | null>(null)
  const [eventUrl, setEventUrl] = useState<string | null>(null)
  useEffect(() => {
      const fetchEvents = async () => {
        try {
          const fetchedEvents = await getEvents()
          setEvents(fetchedEvents)
          // Set the first event image as default if events exist
          if (fetchedEvents && fetchedEvents.length > 0) {
            setEventImage(fetchedEvents[0].image)
          }
        } catch (error) {
          console.error("Error fetching events:", error)
        }
      }
      fetchEvents()
    }, [])

  return (
    <TwoColumnsWrapper padFirst tabsOnMobile initialActiveIndex={0} >
      <div>
        {events.map((item, index) => (
            <div 
            key={index}
            onMouseEnter={() => {
              setEventImage(item.image);
              setEventUrl(`/events/${item.slug}`);
            }}
            >
              <Link href={`/events/${item.slug}`} className={styles.listImage}>
                  <ImageWithCaption enableLightbox={false} file={item.image} caption={null}/>
              </Link>
              
              <ListItem
                href={`/events/${item.slug}`}
                id={item.date}
                content={item.title}
                isHovered={eventImage === item.image}
              />
            </div>
        ))}
      </div>
      {eventUrl ? (
        <Link href={eventUrl}>
          {eventImage && <ImageWithCaption enableLightbox={false} file={eventImage} caption=""/>}
        </Link>
      ) : (
        <div>
          {eventImage && <ImageWithCaption enableLightbox={false} file={eventImage} caption=""/>}
        </div>
      )}
    </TwoColumnsWrapper>
  )
  
}

