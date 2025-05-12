import { FlatList, Text, View } from 'react-native'
import { NotificationCard } from '../../atoms/card/notificationCardAtom'
import { useEventNotifications } from '@//hook/notification/useNotification'

export const NotificationList = () => {
  const { notifications, loading, error } = useEventNotifications()

  if (loading) return <Text>Carregando notificações...</Text>

  if (error) return <Text>Ocorreu um erro ao carregar as notificações.</Text>

  if (notifications.length === 0) {
    return (
      <View>
        <Text className="text-center text-gray-500 mt-4">Nenhuma notificação.</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: 12 }}
      renderItem={({ item }) => {
        const time = new Date(item.createdAt).toLocaleTimeString('pt-BR') // Formata o horário
        const message = item.description
        const actionText = 'Marcar como lida' // Pode ser personalizado conforme a necessidade
        return (
          <NotificationCard
            key={item.id}
            message={message}
            time={time}
            actionText={actionText}
            onActionPress={() => console.log(`Ação: ${actionText}`)}
          />
        )
      }}
    />
  )
}
