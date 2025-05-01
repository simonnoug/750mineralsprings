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

export const getSprings = async (): Promise<Spring[]> => {
  const query = '*[_type == "spring"]';
  const springs = await client.fetch(query);
  return springs;
};

export const getEvents = async (): Promise<Event[]> => {
  const query = '*[_type == "event"]';
  const events = await client.fetch(query);
  return events;
};

export const getHome = async (): Promise<any> => {
  const query = '*[_type == "home"]';
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