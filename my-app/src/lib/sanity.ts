import { createClient } from 'next-sanity'
import { GetAboutQueryResult, GetEventBySlugQueryResult, GetFriendBySlugQueryResult, GetHomeQueryResult, GetMarqueeQueryResult, GetEventsQueryResult, GetFriendsQueryResult, GetSupportQueryResult, SpringsQueryResult, SpringBySlugQueryResult } from '../types/sanity.types'
import groq from 'groq'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-02-12',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export const springsQuery = groq`
  *[_type == "spring"] | order(id asc){
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

export async function getSprings(): Promise<SpringsQueryResult | null> {
  const raw = await client.fetch(springsQuery)
  return raw.map((item) => ({
    ...item,
    // unwrap slug.current into a simple string
    slug: item.slug?.current || "",
  }))
}
export const springBySlugQuery = groq`
  *[_type == "spring" && slug.current == $slug][0]{
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


export async function getSpringBySlug(slug: string): Promise<SpringBySlugQueryResult | null> {
  const query = springBySlugQuery
  const raw = await client.fetch(query, { slug })
  if (!raw) return null
  return {
    ...raw,
    slug: raw.slug?.current || "",
  }
}

export const getEvents = async (): Promise<GetEventsQueryResult | null > => {
  const getEventsQuery = groq`*[_type == "event"] | order(date desc){
    title,
    date,
    "slug": slug.current,
    "image": images[0].file
  }`;
  const events = await client.fetch(getEventsQuery);
  return events
};

export async function getEventBySlug(slug: string): Promise<GetEventBySlugQueryResult | null> {
  const getEventBySlugQuery = groq`*[_type == "event" && slug.current == $slug][0]{
    slug,
    id,
    title,
    date,
    description,
    images,
    springs[] -> {id, name, "slug": slug.current}
  }`
  const raw = await client.fetch(getEventBySlugQuery, { slug })
  if (!raw) return null
  return {
    ...raw,
    // unwrap slug.current into a simple string
    slug: raw.slug?.current || "",
  }
}

export const getHome = async (): Promise<GetHomeQueryResult | null > => {
  const getHomeQuery = groq`*[_type == "home" && _id=="homePage"][0]{image}`;
  const home = await client.fetch(getHomeQuery);
  return home;
}

export const getAbout = async (): Promise<GetAboutQueryResult | null > => {
  const getAboutQuery = groq`*[_type == "about" && _id=="aboutPage"][0]{contact, about, _id}`;
  const about = await client.fetch(getAboutQuery);
  return about;
}

export const getFriends = async (): Promise<GetFriendsQueryResult | null > => {
  const getFriendsQuery = groq`*[_type == "friend"]`;
  const friend = await client.fetch(getFriendsQuery);
  return friend;
}

export async function getFriendBySlug(slug: string): Promise<GetFriendBySlugQueryResult | null> {
  const getFriendBySlugQuery = groq`*[_type == "friend" && slug.current == $slug][0]{
    slug,
    name,
    description,
    image,
  }`
  const raw = await client.fetch(getFriendBySlugQuery, { slug })
  if (!raw) return null
  return {
    ...raw,
    // unwrap slug.current into a simple string
    slug: raw.slug?.current || "",
  }}

export const getSupport = async (): Promise<GetSupportQueryResult | null > => {
  const getSupportQuery = groq`*[_type == "support"][0]{image, membership, payment}`;
  const support = await client.fetch(getSupportQuery);
  return support;
}


// marquee



export const getMarquee = async (): Promise<GetMarqueeQueryResult> => {
  const getMarqueeQuery = groq`*[_type == "marquee"][0]{content, link -> {slug}}`;
  const marquee = await client.fetch(getMarqueeQuery);
  return marquee;
}
