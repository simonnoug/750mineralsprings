import { createClient } from 'next-sanity'
import { Spring } from '@/src/types/spring'
import { NewsItem } from '@/src/types/news'

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

export const getNews = async (): Promise<NewsItem[]> => {
  const query = '*[_type == "news"]';
  const news = await client.fetch(query);
  return news;
};

export const getHome = async (): Promise<any> => {
  const query = '*[_type == "home"]';
  const home = await client.fetch(query);
  return home;
}