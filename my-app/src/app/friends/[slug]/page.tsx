import { getFriendBySlug } from "@/src/lib/sanity"
import FriendClient from "./FriendClient"

export default async function FriendPage({
  params,
}: {
  params: { slug: string }
}) {
  const friend = await getFriendBySlug(params.slug)
  
  return <FriendClient friend={friend} />
}
