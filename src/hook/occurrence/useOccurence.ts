import { getOccurrences, Occurrence } from "@//services/occurrence/occurrenceService"
import { mapOccurrenceToItem, OccurrenceItem } from "@//utils/adapters/occurrence/occurrenceAdapter"
import { useEffect, useState, useCallback } from "react"

export type OccurrenceFilters = {
  classId?: string
  year?: string
  status?: string
}

export const useOccurrence = (filters?: OccurrenceFilters) => {
  const [occurrences, setOccurrences] = useState<OccurrenceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const data: Occurrence[] = await getOccurrences()

      const filtered = data.filter((occ) => {
        const statusMatch = filters?.status ? occ.attributes.status === filters.status : true
        const classMatch = filters?.classId ? occ.relationships.student.data.id === filters.classId : true
        const yearMatch = filters?.year ? occ.attributes.created_at.startsWith(filters.year) : true
        return statusMatch && classMatch && yearMatch
      })

      setOccurrences(filtered.map(mapOccurrenceToItem))
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao carregar as ocorrências")
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { occurrences, loading, error, refetch: fetchData }
}
