"use client"

import { useState, useEffect } from "react"
import { getEvents } from '@/src/lib/sanity'
import { Event } from "@/src/types/events"




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
    <section>
      <ul>
        {events.map((item) => (
          <li key={item.id || item.title}>
            {item.date} - {item.title}
          </li>
        ))}
      </ul>
    </section>
  )
  
}

