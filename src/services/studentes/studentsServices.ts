import { getToken } from "../../storage/secureToken"
import Constants from "expo-constants"

const apiUrl = Constants.expoConfig?.extra?.apiUrl
const apiKey = Constants.expoConfig?.extra?.apiKey

export const getStudentById = async (id: string): Promise<{ name: string }> => {
  const authToken = await getToken()

  if (!authToken) throw new Error("Token de autenticação não encontrado.")

  const response = await fetch(`${apiUrl}/api/v1/students/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
      "X-API-KEY": apiKey,
    },
  })

  const data = await response.json()
  return { name: data.data.attributes.name }
}
