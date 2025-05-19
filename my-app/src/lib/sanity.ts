import { createClient } from 'next-sanity'
import { Spring } from '@/src/types/spring'
import { Event } from '@/src/types/events'
import { Any } from '@sanity/client/csm'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-02-12',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const springsQuery = `*[_type == "spring"] | order(id asc){
  _id,
  id,
  name,
  location,
  region,
  ownership,
  access,
  properties,
  treatment,
  // grab the raw slug object
  slug
}`

export async function getSprings(): Promise<Spring[]> {
  const raw = await client.fetch(springsQuery)
  return raw.map((item: any) => ({
    ...item,
    // unwrap slug.current into a simple string
    slug: item.slug?.current || "",
  }))
}
export const springBySlugQuery = `*[_type == "spring" && slug.current == $slug][0]{
  _id,
  id,
  name,
  slug,
  location,
  region,
  municipality,
  note,
  ownership,
  access,
  properties,
  treatment,
  // ─────────────────────────────────────────────
  // Pull in any events that reference this spring
  "events": *[_type == "event" && references(^._id)]{
    _id,
    title,
    date,
    "slug": slug.current,
    // any other event fields you need
  },
  images[]{title, file} 
}`


export async function getSpringBySlug(slug: string): Promise<Spring | null> {
  const query = springBySlugQuery
  const raw: any = await client.fetch(query, { slug })
  if (!raw) return null
  return {
    ...raw,
    slug: raw.slug?.current || "",
  }
}

export const getEvents = async (): Promise<Event[]> => {
  const query = `*[_type == "event"] | order(date desc){
    title,
    date,
    "slug": slug.current,
    "image": images[0].file
  }`;
  const events = await client.fetch(query);
  return events
};

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const query = `*[_type == "event" && slug.current == $slug][0]{
    slug,
    id,
    title,
    date,
    description,
    images,
    springs[] -> {id, name, "slug": slug.current}
  }`
  const raw: any = await client.fetch(query, { slug })
  if (!raw) return null
  return {
    ...raw,
    // unwrap slug.current into a simple string
    slug: raw.slug?.current || "",
  }
}

export const getHome = async (): Promise<any> => {
  const query = '*[_type == "home" && _id=="homePage"][0]{image}';
  const home = await client.fetch(query);
  return home;
}

export const getAbout = async (): Promise<any> => {
  const query = '*[_type == "about"]';
  const about = await client.fetch(query);
  return about;
}

export const getFriends = async (): Promise<any> => {
  const query = '*[_type == "friend"]';
  const friend = await client.fetch(query);
  return friend;
}

export async function getFriendBySlug(slug: string): Promise<any | null> {
  const query = `*[_type == "friend" && slug.current == $slug][0]{
    slug,
    name,
    description,
    image,
  }`
  const raw: any = await client.fetch(query, { slug })
  if (!raw) return null
  return {
    ...raw,
    // unwrap slug.current into a simple string
    slug: raw.slug?.current || "",
  }}

export const getSupport = async (): Promise<any> => {
  const query = '*[_type == "support"][0]{image, membership, payment}';
  const support = await client.fetch(query);
  return support;
}


// marquee

export type Marquee = {
  content: string;
  link: any;
}


export const getMarquee = async (): Promise<Any> => {
  const query = '*[_type == "marquee"][0]{content, link -> {slug}}';
  const marquee = await client.fetch(query);
  return marquee;
}

