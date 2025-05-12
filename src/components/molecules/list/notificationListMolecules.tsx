import { FlatList, View } from 'react-native'
import { NotificationCard } from '../../atoms/card/notificationCardAtom'


const mockData = [
  {
    id: '1',
    message: 'Samuel has settled the restaurant expenses',
    time: '3 mins ago',
    actionText: 'Mark as read',
  },
  {
    id: '2',
    message: 'Sabrina has settled the grocery expenses',
    time: '9 hours ago',
    actionText: 'Delete',
  },
  {
    id: '3',
    message: 'Jolly has added 3 new expenses in Office',
    time: '15 hours ago',
    actionText: 'Delete',
  },
]

export const NotificationList = () => (
  <FlatList
    data={mockData}
    keyExtractor={(item) => item.id}
    contentContainerStyle={{ gap: 12 }}
    renderItem={({ item }) => (
      <NotificationCard
        message={item.message}
        time={item.time}
        actionText={item.actionText}
        onActionPress={() => console.log(`Action: ${item.actionText}`)}
      />
    )}
  />
)
