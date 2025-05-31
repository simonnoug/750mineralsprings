import { getEventBySlug } from "@/src/lib/sanity"
import EventPageClient from "./client-page"

export default async function EventPage({
  params,
}: {
  params: { slug: string }
}) {
  const event = await getEventBySlug(params.slug)
  return <EventPageClient event={event} />
}
