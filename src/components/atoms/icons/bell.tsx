import { View, TouchableOpacity, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'

type Props = {
  onPress: () => void
  notificationCount?: number
}

export const NotificationBell = ({ onPress, notificationCount = 0 }: Props) => {
  const hasNotifications = notificationCount > 0

  return (
    <TouchableOpacity onPress={onPress} className="relative">
      <Feather name="bell" size={24} color="#FFFFFF" />
      {hasNotifications && (
        <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 justify-center items-center">
          <Text className="text-white text-xs font-bold">
            {notificationCount > 99 ? '99+' : notificationCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  )
}
