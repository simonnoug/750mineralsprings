import Button from "@/src/components/atoms/Button"
import TwoColumnsWrapper from "@/src/components/layouts/TwoColumnsWrapper"
import { getFriendBySlug } from "@/src/lib/sanity"
import { PortableText } from "next-sanity"
import ImageWithCaption from "@/src/components/atoms/ImageWithCaption"

export default async function FriendPage({
  params,
}: {
  params: { slug: string }
}) {
  const friend = await getFriendBySlug(params.slug)

  return (
    <TwoColumnsWrapper padFirst>
      <div>
        <h1>{friend.name}</h1>
        <PortableText 
            value={friend?.description}
            components={{
              block: {
                // Use your CSS module for paragraphs
              normal: ({ children }) => <p>{children}</p>}}} />
      </div>
      <ImageWithCaption
        file={friend?.image?.file}
        caption={friend?.image?.caption}/>
    </TwoColumnsWrapper>
  )
}
