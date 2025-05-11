import { getToken } from "../../storage/secureToken"
import Constants from "expo-constants"

const apiUrl = Constants.expoConfig?.extra?.apiUrl
const apiKey = Constants.expoConfig?.extra?.apiKey

export type Stats = {
  total_students: number
  scheduled_appointments: number
  pending_occurrencies: number
  pending_orientations: number
}

export const getStats = async (
): Promise<Stats | null> => {
  try {
    const authToken = await getToken()
    if (!authToken) throw new Error("Token de autenticação não encontrado.")

    const response = await fetch(
      `${apiUrl}/api/v1/dashboard/stats`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
          "X-API-KEY": apiKey,
        },
      }
    )

    if (!response.ok) {
      throw new Error("Erro ao obter dados de estatísticas.")
    }

    const data = await response.json()

    const stats: Stats = {
      total_students: data.total_students || 0,
      scheduled_appointments: data.scheduled_appointments || 0,
      pending_occurrencies: data.pending_occurrencies || 0,
      pending_orientations: data.pending_orientations || 0,
    }

    return stats

  } catch (err: unknown) {
    console.error("Erro ao buscar dados de estatísticas:", err)
    return null
  }
}
