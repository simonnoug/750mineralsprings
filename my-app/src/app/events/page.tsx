"use client"

import { useState, useEffect } from "react"
import { getEvents } from '@/src/lib/sanity'
import { Event } from "@/src/types/events"
import Link from "next/link"
import ListItem from "@/src/components/atoms/ListItem"
import TwoColumnsWrapper from "@/src/components/layouts/TwoColumnsWrapper"


export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  useEffect(() => {
      const fetchEvents = async () => {
        try {
          const fetchedEvents = await getEvents()
          setEvents(fetchedEvents)
        } catch (error) {
          console.error("Error fetching events:", error)
        }
      }
      fetchEvents()
    }, [])

  return (
    <TwoColumnsWrapper padFirst reverseOnMobile>
      <div>
        {events.map((item) => (
          <div key={item._id}>
            <ListItem
              href={`/events/${item.slug}`}
              id={item.date}
              content={item.title}
            />
          </div>
        ))}
      </div>
    </TwoColumnsWrapper>
  )
  
}

