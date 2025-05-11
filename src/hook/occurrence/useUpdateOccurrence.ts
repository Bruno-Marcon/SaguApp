import { updateOccurrence } from "@//services/occurrence/occurrenceService"
import { useState } from "react"

interface UpdateOccurrencePayload {
  responsible_id?: string
  status?: string
  kind?: string
  severity?: string
}

export const useUpdateOccurrence = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mutate = async (id: string, payload: UpdateOccurrencePayload) => {
    setLoading(true)
    setError(null)

    try {
      await updateOccurrence(id, payload)
    } catch (err) {
      console.error("Erro ao atualizar ocorrência:", err)
      setError("Erro ao atualizar ocorrência")
    } finally {
      setLoading(false)
    }
  }

  return { mutate, loading, error }
}
