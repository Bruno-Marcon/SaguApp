// src/hooks/useEvents.ts
import { getEvents } from '@//services/events/eventServices'
import { useEffect, useState } from 'react'

// 🔠 Tipagem local
type EventAttributes = {
  description: string
  created_at: string
  author_id: string
  eventable_id: string
  target_id: string | null
}

type Event = {
  id: string
  type: string
  attributes: EventAttributes
}

type Meta = {
  current_page: number
  total_pages: number
  total_count: number
}

type GetEventsResponse = {
  data: Event[]
  meta: Meta
}

export const useEvents = (page = 1, size = 20) => {
  const [events, setEvents] = useState<Event[]>([])
  const [meta, setMeta] = useState<Meta | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      setError(null)

      try {
        const response: GetEventsResponse = await getEvents(page, size)
        setEvents(response.data)
        setMeta(response.meta)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [page, size])

  return { events, meta, loading, error }
}
