import { getSpringBySlug } from "@/src/lib/sanity"
import SpringPageContent from "@/src/components/SpringPage"

export default async function SpringPage({ params }: { params: { slug: string } }) {
  const spring = await getSpringBySlug(params.slug)
  return <SpringPageContent spring={spring} />
}