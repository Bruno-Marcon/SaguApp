import { useEffect, useState } from "react"
import { getOccurrencesByStudentId, Occurrence } from "../../services/occurrence/occurrenceService"

export const useOccurrencesByStudentId = (studentId: string) => {
  const [occurrences, setOccurrences] = useState<Occurrence[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOccurrences = async () => {
      try {
        setLoading(true)
        const data = await getOccurrencesByStudentId(studentId)
        setOccurrences(data)
        setError(null)
      } catch (err) {
        setError("Erro ao carregar as ocorrências do aluno")
      } finally {
        setLoading(false)
      }
    }

    if (studentId) {
      fetchOccurrences()
    }
  }, [studentId])

  return { occurrences, loading, error }
}
