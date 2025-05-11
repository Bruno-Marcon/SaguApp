import { getOccurrencyById } from "@//services/occurrence/occurrenceService"
import { useEffect, useState } from "react"

type Relationship = { id: string, type: string }

type OccurrencyDetails = {
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
    student: { data: Relationship }
    relator: { data: Relationship }
    responsible: { data: Relationship }
    events: { data: Relationship[] }
  }
}

type IncludedItem = {
  id: string
  type: string
  attributes: any
  relationships?: any
}

export function useOccurrencyDetails(id: string) {
  const [data, setData] = useState<OccurrencyDetails | null>(null)
  const [included, setIncluded] = useState<IncludedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    let isMounted = true

    async function fetchDetails() {
      setLoading(true)
      setError(null)

      try {
        const response = await getOccurrencyById(id)
        if (isMounted) {
          setData(response.data)
          setIncluded(response.included || [])
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Erro ao buscar detalhes da ocorrência")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchDetails()

    return () => {
      isMounted = false
    }
  }, [id])

  return { data, included, loading, error }
}
