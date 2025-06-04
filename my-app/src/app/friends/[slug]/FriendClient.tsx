'use client'

import Button from "@/src/components/atoms/Button"
import TwoColumnsWrapper from "@/src/components/layouts/TwoColumnsWrapper"
import { PortableText } from "next-sanity"
import ImageWithCaption from "@/src/components/atoms/ImageWithCaption"
import { useEffect } from "react"
import { useMobileNav } from "@/src/contexts/MobileNavContext"
import { GetFriendBySlugQueryResult } from "@/src/types/sanity.types"

interface FriendClientProps {
  friend: GetFriendBySlugQueryResult; // You might want to define a proper type for this
}

export default function FriendClient({ friend }: FriendClientProps) {
    const { setMobileLeftExtras, setMobileMiddleExtras } = useMobileNav();
    
      useEffect(() => {
        setMobileLeftExtras(
          <Button href="/friends">Back</Button>
        );
        setMobileMiddleExtras(
          null
        );
        return () => {
          setMobileLeftExtras(null);
          setMobileMiddleExtras(null);
        };
      }, [setMobileLeftExtras, setMobileMiddleExtras]);
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
