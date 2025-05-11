import { getOccurrencies } from "@//services/occurrence/occurrenceService"
import { useEffect, useState } from "react"


type Occurrency = {
  id: string
  type: string
  attributes: {
    title: string
    description: string
    kind: string | null
    status: string | null
    severity: string | null
    created_at: string
  }
  relationships: {
    student: { data: { id: string, type: string } }
    relator: { data: { id: string, type: string } }
    responsible: { data: { id: string, type: string } }
    events: { data: { id: string, type: string }[] }
  }
}

type Meta = {
  current_page: number
  next_page: number | null
  prev_page: number | null
  total_pages: number
  total_count: number
}

export function useOccurrencies(page = 1, size = 20) {
  const [data, setData] = useState<Occurrency[]>([])
  const [meta, setMeta] = useState<Meta | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        const response = await getOccurrencies(page, size)
        if (isMounted) {
          setData(response.data)
          setMeta(response.meta)
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Erro inesperado")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [page, size])

  return { data, meta, loading, error }
}
