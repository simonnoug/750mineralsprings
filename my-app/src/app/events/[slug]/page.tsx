import Button from "@/src/components/atoms/Button"
import TwoColumnsWrapper from "@/src/components/layouts/TwoColumnsWrapper"
import { getEventBySlug } from "@/src/lib/sanity"
import { PortableText } from "next-sanity"
import ImageWithCaption from "@/src/components/atoms/ImageWithCaption"

export default async function EventPage({
  params,
}: {
  params: { slug: string }
}) {
  const event = await getEventBySlug(params.slug)
  const formattedId = event.id < 10 ? `00${event.id}` : event.id < 100 ? `0${event.id}` : `${event.id}`

  return (
    <TwoColumnsWrapper padFirst>
      <div>
      <Button href="/events">Back</Button>
      <h1>#</h1>
      <p>{formattedId}</p>
      <h1>Event</h1>
      <p>{event?.title || "Event not found"}</p>
      <h1>Date</h1>
      <p>{event?.date}</p>
      <h1>Springs</h1>

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
