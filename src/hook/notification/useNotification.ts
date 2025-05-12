// src/hooks/events/useEventNotifications.ts
import { getEventNotifications } from "@//services/notification/notificationService"
import { useState, useEffect } from "react"

type EventNotification = {
  id: string
  description: string
  createdAt: string
  authorId: string
  targetId: string
}

export const useEventNotifications = () => {
  const [notifications, setNotifications] = useState<EventNotification[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await getEventNotifications()
        setNotifications(data) // Agora a resposta é diretamente o array de notificações
      } catch (err: any) {
        setError("Erro ao carregar as notificações.")
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  return { notifications, loading, error }
}
