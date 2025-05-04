import TwoColumnsWrapper from "@/src/components/layouts/TwoColumnsWrapper"
import { getSpringBySlug } from "@/src/lib/sanity"
import Link from "next/link"

export default async function SpringPage({
  params,
}: {
  params: { slug: string }
}) {
  const spring = await getSpringBySlug(params.slug)
  const formattedId = spring.id < 10 ? `00${spring.id}` : spring.id < 100 ? `0${spring.id}` : `${spring.id}`
  return (
    <TwoColumnsWrapper padFirst reverseOnMobile>
     <div>
    <Link href="/springs" className="button"> Back</Link>
    <dl>
        <dt>#</dt><dd>{formattedId}</dd>
        <dt>SPRING</dt><dd>{spring?.name}</dd>
        <dt>EVENS</dt> <dd>event</dd>
        <dt>REGION</dt><dd>region</dd>
        <dt>MUNICIPALITY</dt><dd>municiaplity</dd>
        <dt>NOTE</dt><dd>note</dd>
        <dt>OWNERSHIP</dt><dd>ownership</dd>
        <dt>TREATMENTS</dt><dd>treatments</dd>
        <dt>PHOTO</dt><dd>photos</dd>
        <dt>LOCATION</dt><dd>{spring?.location ? `${spring.location.lat}, ${spring.location.lng}` : ""}</dd>
    </dl>
      </div>
    </TwoColumnsWrapper>
  )
}



