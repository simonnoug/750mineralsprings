"use client"

import { useState } from "react"
import { useEffect } from "react"
import { getNews } from '@/src/lib/sanity'
import { NewsItem } from "@/src/types/news"




export default function News() {
  const [expandedNews, setExpandedNews] = useState<number | null>(null)
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
      const fetchNews = async () => {
        const fetchedNews = await getNews()
        setNews(fetchedNews)
      }
      fetchNews()
    }, [])

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white border border-neutral-200 border-black dark:border-neutral-800">
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          {news.map((item) => (
            <div key={item.id} className="border-b border-black last:border-b-0 p-4">
              <h2 className="font-bold text-lg mb-2">{item.name}</h2>
              <p className="text-sm mb-2">{item.date}</p>
              {expandedNews === item.id ? (
                <>
                  <p className="mb-2">{item.content}</p>
                  <button
                    className="bg-white border border-neutral-200 border-black px-2 py-1 text-sm dark:border-neutral-800"
                    onClick={() => setExpandedNews(null)}
                  >
                    Read Less
                  </button>
                </>
              ) : (
                <button
                  className="bg-white border border-neutral-200 border-black px-2 py-1 text-sm dark:border-neutral-800"
                  onClick={() => setExpandedNews(item.id)}
                >
                  Read More
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

