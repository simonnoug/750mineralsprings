"use client"

import { useState, useEffect } from "react"
import { getEvents } from '@/src/lib/sanity'
import { Event } from "@/src/types/events"
import Link from "next/link"
import ListItem from "@/src/components/atoms/ListItem"
import TwoColumnsWrapper from "@/src/components/layouts/TwoColumnsWrapper"
import ImageWithCaption from "@/src/components/atoms/ImageWithCaption"


export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [eventImage, setEventImage] = useState<any | null>(null)
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
    <TwoColumnsWrapper padFirst reverseOnMobile>
      <div>
        {events.map((item, index) => (
            <div 
            key={index}
            onMouseEnter={() => {
              setEventImage(item.image);
              setEventUrl(`/events/${item.slug}`);
            }}
            >
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

