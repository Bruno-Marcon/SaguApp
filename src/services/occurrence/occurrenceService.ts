import { getToken } from "../../storage/secureToken"
import Constants from "expo-constants"

const apiUrl = Constants.expoConfig?.extra?.apiUrl
const apiKey = Constants.expoConfig?.extra?.apiKey

export const getOccurrencies = async (page = 1, size = 20) => {
  const authToken = await getToken()

  if (!authToken) {
    throw new Error("Token de autenticação não encontrado")
  }

  try {
    const response = await fetch(
      `${apiUrl}/api/v1/occurrencies?page[number]=${page}&page[size]=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
          "X-API-KEY": apiKey
        }
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData?.message || "Erro ao buscar ocorrências")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Erro em getOccurrencies:", error)
    throw error
  }
}

export const getOccurrencyById = async (id: string) => {
  const authToken = await getToken()

  if (!authToken) {
    throw new Error("Token de autenticação não encontrado")
  }

  try {
    const response = await fetch(`${apiUrl}/api/v1/occurrencies/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
        "X-API-KEY": apiKey
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData?.message || "Erro ao buscar detalhes da ocorrência")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Erro em getOccurrencyById:", error)
    throw error
  }
}


