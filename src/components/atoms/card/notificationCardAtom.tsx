import { Text, TouchableOpacity, View } from 'react-native'

type Props = {
  message: string
  time: string
  actionText: string
  onActionPress: () => void
}

export const NotificationCard = ({ message, time, actionText, onActionPress }: Props) => (
  <View className="bg-white rounded-xl p-4 shadow-md">
    <Text className="text-sm text-gray-900 font-medium">{message}</Text>
    <Text className="text-xs text-gray-500 mt-1">{time}</Text>

    <View className="flex-row justify-end mt-2">
      <TouchableOpacity
        className="bg-green-100 px-3 py-1 rounded-md"
        onPress={onActionPress}
      >
        <Text className="text-green-700 text-sm">{actionText}</Text>
      </TouchableOpacity>
    </View>
  </View>
)
