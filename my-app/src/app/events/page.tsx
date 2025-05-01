"use client"

import { useState, useEffect } from "react"
import { getEvents } from '@/src/lib/sanity'
import { Event } from "@/src/types/events"
import Link from "next/link"



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
    <main>
        {events.map((item) => (
          <div key={item._id}>
             <Link href={`/events/${item.slug}`}>
             {item.date} {item.title}
              </Link>
           
          </div>
        ))}
    </main>
  )
  
}

