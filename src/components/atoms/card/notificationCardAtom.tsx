import { Text, TouchableOpacity, View } from 'react-native'

type Props = {
  message: string
  time: string
  actionText: string
  onActionPress: () => void
}

export const NotificationCard = ({ message, time, actionText, onActionPress }: Props) => (
  <View className="bg-white rounded-xl p-4 shadow-md my-2 mx-4">
    <Text className="text-sm text-gray-800 font-medium mb-1">{message}</Text>
    <Text className="text-xs text-gray-500 mb-3">{time}</Text>

    <View className="flex-row justify-end">
      <TouchableOpacity
        className="bg-green-500 px-4 py-2 rounded-full border border-green-500"
        onPress={onActionPress}
      >
        <Text className="text-white text-sm font-semibold">{actionText}</Text>
      </TouchableOpacity>
    </View>
  </View>
)
