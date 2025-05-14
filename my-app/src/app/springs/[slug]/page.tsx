import Button from "@/src/components/atoms/Button"
import TwoColumnsWrapper from "@/src/components/layouts/TwoColumnsWrapper"
import { getSpringBySlug } from "@/src/lib/sanity"

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
    <Button href="/springs"> Back</Button>
    <dl>
        <dt>#</dt><dd>{formattedId}</dd>
        <dt>SPRING</dt><dd>{spring?.name}</dd>
        <dt>EVENTS</dt> <dd>event</dd>
        <dt>REGION</dt><dd>{spring?.region}</dd>
        <dt>MUNICIPALITY</dt><dd>{spring?.municipality}</dd>
        <dt>NOTE</dt><dd>{spring?.note}</dd>
        <dt>OWNERSHIP</dt><dd>{spring?.ownership?.longerOption}</dd>
        <dt>TREATMENTS</dt><dd>{spring?.treatment}</dd>
        <dt>PHOTO</dt><dd>photos</dd>
        <dt>LOCATION</dt><dd>{spring?.location ? `${spring.location.lat}, ${spring.location.lng}` : ""}</dd>
    </dl>
      </div>
    </TwoColumnsWrapper>
  )
}



