import TwoColumnWrapper from "@/src/components/layouts/TwoColumnsWrapper"
import { getSupport } from "@/src/lib/sanity";
import { PortableText } from "next-sanity"
import ImageWithCaption from "@/src/components/atoms/ImageWithCaption"
import style from "@/src/components/page.module.css"

export default async function support() {
  const supportData = await getSupport();
  return (
    <TwoColumnWrapper padFirst tabsOnMobile initialActiveIndex={0}>
      <dl className={style.container}>
        <dt>Membership</dt>
        <dd>
        <PortableText
          value={supportData.membership}
          components={{
            block: {
              normal: ({ children }) => <p>{children}</p>
            }
          }}
        />
        </dd>
        <dt>Payment</dt>
        <dd>
        <PortableText
          value={supportData.payment}
          components={{
            block: {
              normal: ({ children }) => <p>{children}</p>
            }
          }}
        />
        </dd>
      </dl>
      <ImageWithCaption 
        file={supportData.image.file} 
        caption={supportData.image.caption}
      />
    </TwoColumnWrapper> 
  )
}

