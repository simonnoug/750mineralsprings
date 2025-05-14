import TwoColumnWrapper from "@/src/components/layouts/TwoColumnsWrapper"
import { getSupport } from "@/src/lib/sanity";
import { PortableText } from "next-sanity"
import ImageWithCaption from "@/src/components/atoms/ImageWithCaption"

export default async function support() {
  const supportData = await getSupport();
  return (
    <TwoColumnWrapper padFirst padSecond>
      <div>
        <h1>Membership</h1>
        <PortableText
          value={supportData.membership}
          components={{
            block: {
              normal: ({ children }) => <p>{children}</p>
            }
          }}
        />
        <h1>Payment</h1>
        <PortableText
          value={supportData.payment}
          components={{
            block: {
              normal: ({ children }) => <p>{children}</p>
            }
          }}
        />
      </div>
      <ImageWithCaption 
        file={supportData.image.file} 
        caption={supportData.image.caption}
      />
    </TwoColumnWrapper> 
  )
}

