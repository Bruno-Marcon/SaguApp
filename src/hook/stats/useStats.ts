// src/hooks/useStats.ts

import { getStats } from "@//services/dashBoard/stats"
import { useState, useEffect } from "react"

type Stats = {
  scheduled_appointments: number
  pending_occurrencies: number
  pending_orientations: number
}

export const useStats = () => {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    setLoading(true)
    try {
      const data = await getStats()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar as estatísticas")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return { stats, loading, error, refetch: fetchStats }
}
