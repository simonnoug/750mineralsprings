import { createClient } from 'next-sanity'
import { Spring } from '@/src/types/spring'
import { Event } from '@/src/types/events'

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

export async function getSpringBySlug(slug: string): Promise<Spring | null> {
  const query = `*[_type == "spring" && slug.current == $slug][0]{
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
  }`
  const raw: any = await client.fetch(query, { slug })
  if (!raw) return null
  return {
    ...raw,
    slug: raw.slug?.current || "",
  }
}

export const getEvents = async (): Promise<Event[]> => {
  const query = '*[_type == "event"] | order(date desc){_id, title, description, date, slug}';
  const raw = await client.fetch(query);
  return raw.map((item: any) => ({
    ...item,
    slug: item.slug?.current || "",
  }));
};

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const query = `*[_type == "event" && slug.current == $slug][0]{
    slug,
    id,
    title,
    date,
    description,
    images,
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