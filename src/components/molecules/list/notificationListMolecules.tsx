import { FlatList, Text, View } from 'react-native';
import { NotificationCard } from '../../atoms/card/notificationCardAtom';
import { Event } from '../../../../types/event';

type Props = {
  notifications: Event[];
  onMarkAsRead: (id: string) => void;
};

export const NotificationList = ({ notifications, onMarkAsRead }: Props) => {
  if (notifications.length === 0) {
    return (
      <View>
        <Text className="text-center text-gray-500 mt-4">Nenhuma notificação.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: 12, paddingBottom: 12 }}
      renderItem={({ item }) => {
        const time = new Date(item.attributes.created_at).toLocaleTimeString('pt-BR');
        const message = item.attributes.description;
        const actionText = 'Marcar como lida';

        return (
          <NotificationCard
            key={item.id}
            message={message}
            time={time}
            actionText={actionText}
            onActionPress={() => onMarkAsRead(item.id)}
          />
        );
      }}
    />
  );
};
