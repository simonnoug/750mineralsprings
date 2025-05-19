import Button from "@/src/components/atoms/Button"
import TwoColumnsWrapper from "@/src/components/layouts/TwoColumnsWrapper"
import { getEventBySlug } from "@/src/lib/sanity"
import { PortableText } from "next-sanity"
import ImageWithCaption from "@/src/components/atoms/ImageWithCaption"
import ListItem from "@/src/components/atoms/ListItem"
import formatted from "@/src/components/atoms/formatted"
import style from "@/src/components/page.module.css"

export default async function EventPage({
  params,
}: {
  params: { slug: string }
}) {
  const event = await getEventBySlug(params.slug)
  const formattedEventId = formatted(event.id)
  
  return (
    <TwoColumnsWrapper padFirst>
      <div>
      <div className={style.buttonContainer}><Button href="/events">Back</Button></div>
      <dl className={style.properties}>
      <dt>#</dt><dd>{formattedEventId}</dd>
      <dt>Event</dt><dd>{event?.title || ""}</dd>
      <dt>Date</dt><dd>{event?.date || ""}</dd>
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
              // Use your CSS module for paragraphs
             normal: ({ children }) => <p>{children}</p>}}} />
      </div>
      <div>
        {event?.images && event.images.map((img, i) => (
          <ImageWithCaption 
            key={i}
            file={img.file}
            caption={img.caption}
          />
        ))}
      </div>
    </TwoColumnsWrapper>
  )
}
