import { getEventBySlug } from "@/src/lib/sanity"
import Link from "next/link"

export default async function EventPage({
  params,
}: {
  params: { slug: string }
}) {
  const event = await getEventBySlug(params.slug)
  return (
    <main>
      <br />
      <Link href="/events" className="button">Back</Link>
      <h1>{event?.title || "Event not found"}</h1>
      <p>{event?.date}</p>
    </main>
  )
}
