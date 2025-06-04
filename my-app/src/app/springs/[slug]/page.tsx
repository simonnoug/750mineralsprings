import { getSpringBySlug } from "@/src/lib/sanity"
import SpringPageContent from "@/src/app/springs/[slug]/SpringPageClient"

export default async function SpringPage({ params }: { params: { slug: string } }) {
  // on "await" maintenant params pour en extraire slug
  const { slug } = await params
  const spring = await getSpringBySlug(slug)
  return <SpringPageContent spring={spring} />
}