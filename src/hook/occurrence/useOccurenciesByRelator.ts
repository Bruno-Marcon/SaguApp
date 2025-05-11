import { getOccurrencies } from "@//services/occurrence/occurrenceService"
import { getUserInfo } from "@//storage/SecureUser"
import { getOccurrencyById } from "@//services/occurrence/occurrenceService"
import { useEffect, useState } from "react"

export function useOccurrenciesByRelator() {
  const [occurrences, setOccurrences] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      try {
        const user = await getUserInfo()
        const userId = user?.id
        if (!userId) throw new Error("Usuário não autenticado")

        console.log("[useOccurrenciesByRelator] Buscando ocorrências para o relator...")

        const response = await getOccurrencies()

        console.log('[useOccurrenciesByRelator] Retorno completo da API:', response.data)
        console.log('[useOccurrenciesByRelator] Total de ocorrências recebidas da API:', response.data.length)

        const filteredByRelator = response.data.filter(
          (occ: any) => occ.relationships?.relator?.data?.id === userId
        )

        console.log('[useOccurrenciesByRelator] Total de ocorrências após filtro por relator:', filteredByRelator.length)

        const occurrencesWithDetails = await Promise.all(
          filteredByRelator.map(async (occ: any) => {
            const details = await getOccurrencyById(occ.id)
            return {
              ...occ,
              relationships: details.relationships,
              included: details.included || [],
            }
          })
        )

        if (isMounted) setOccurrences(occurrencesWithDetails)
      } catch (err: any) {
        console.error('[useOccurrenciesByRelator] Erro ao buscar ocorrências:', err)
        if (isMounted) setError(err.message || "Erro ao buscar ocorrências")
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [])

  return { occurrences, loading, error }
}
