import Constants from 'expo-constants'
import { getToken } from '../../storage/secureToken'

const apiUrl = Constants.expoConfig?.extra?.apiUrl
const apiKey = Constants.expoConfig?.extra?.apiKey

export const getEvents = async (page = 1, size = 20) => {
  const authToken = await getToken()

  const response = await fetch(`${apiUrl}/api/v1/events?page[number]=${page}&page[size]=${size}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
      'X-API-KEY': apiKey
    }
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Erro ao buscar eventos')
  }

  const data = await response.json()
  return data
}
