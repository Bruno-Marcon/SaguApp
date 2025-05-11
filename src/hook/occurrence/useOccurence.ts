
import { getOccurrences, Occurrence } from "@//services/occurrence/occurrenceService"
import { mapOccurrenceToItem, OccurrenceItem } from "@//utils/adapters/occurrence/occurrenceAdapter"
import { useEffect, useState } from "react"


export const useOccurrence = () => {
  const [occurrences, setOccurrences] = useState<OccurrenceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Occurrence[] = await getOccurrences()
        const adaptedData = data.map(mapOccurrenceToItem)
        setOccurrences(adaptedData)
      } catch (err) {
        setError("Erro ao carregar as ocorrências")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { occurrences, loading, error }
}
