import { getOccurrenceById, Occurrence } from "@//services/occurrence/occurrenceService"
import { useEffect, useState } from "react"


export const useOccurrenceById = (id: string) => {
  const [occurrence, setOccurrence] = useState<Occurrence | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOccurrence = async () => {
      try {
        const data = await getOccurrenceById(id)
        setOccurrence(data)
      } catch (err) {
        setError("Erro ao buscar ocorrência")
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchOccurrence()
  }, [id])

  return { occurrence, loading, error }
}