import { getToken } from "../../storage/secureToken"
import Constants from "expo-constants"

const apiUrl = Constants.expoConfig?.extra?.apiUrl
const apiKey = Constants.expoConfig?.extra?.apiKey

export const getEventNotifications = async () => {
  const authToken = await getToken()

  if (!authToken) {
    throw new Error('Token de autenticação não encontrado')
  }

  console.log('Token de autenticação:', authToken)

  const response = await fetch(`${apiUrl}/api/v1/events/notifications`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
      "X-API-KEY": apiKey,
    },
  })

  if (!response.ok) {
    console.error('Erro ao obter notificações de eventos. Status:', response.status)
    throw new Error('Erro ao obter notificações de eventos')
  }

  // Logando a resposta completa para depuração
  const responseData = await response.json()

  console.log('Resposta completa da API:', responseData)

  const notifications = responseData.data.map((event: any) => ({
    id: event.id,
    description: event.attributes.description,
    createdAt: event.attributes.created_at,
    authorId: event.relationships.author.data.id,
    targetId: event.relationships.target.data.id,
  }))

  console.log('Notificações formatadas:', notifications)

  return notifications
}
