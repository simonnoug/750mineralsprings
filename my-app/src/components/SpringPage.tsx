'use client'

import Button from "@/src/components/atoms/Button"
import ListItem from "@/src/components/atoms/ListItem"
import ImageWithCaption from "@/src/components/atoms/ImageWithCaption"
import { useSpringImage } from "@/src/contexts/SpringImageContext"
import formatted from "@/src/components/atoms/formatted"
import style from "./page.module.css"

export default function SpringPage({ spring }: { spring: any }) {
  const formattedId = formatted(spring.id)
    const { setSpringImage } = useSpringImage()
    return (
      
       <div>
      <div className={style.buttonContainer}><Button href="/springs">Back</Button></div>
      <dl className={style.properties}>
          <dt>#</dt><dd>{formattedId}</dd>
          <dt>SPRING</dt><dd>{spring?.name}</dd>
          <dt>EVENTS</dt> <dd>
            {spring?.events?.length > 0 ? (
              spring.events.map((event, index) => (
                <ListItem key={index} href={`/events/${event.slug}`} id={event.date} content={event.title}></ListItem>
              ))  
            ) : (
              "No events"
            )}
          </dd>
          <dt>REGION</dt><dd>{spring?.region}</dd>
          <dt>MUNICIPALITY</dt><dd>{spring?.municipality}</dd>
          <dt>NOTE</dt><dd>{spring?.note}</dd>
          <dt>OWNERSHIP</dt><dd>{spring?.ownership?.longerOption}</dd>
          <dt>TREATMENTS</dt><dd>{spring?.treatment}</dd>
          <dt>PHOTO</dt><dd>
          {spring?.images?.length > 0 ? (
              spring.images.map((image, index) => (
                <div key={index}>
                  <button onClick={() => setSpringImage(image)}>{image.title}</button>
                </div>
              ))  
            ) : (
              "No events"
            )}
          </dd>
          <dt>LOCATION</dt><dd>{spring?.location ? `${spring.location.lat}, ${spring.location.lng}` : ""}</dd>
      </dl>
        </div>
      
    )
  }
  