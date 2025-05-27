import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'

type Props = {
  date: string
}

export default function OccurrenceCardMeta({ date }: Props) {
  return (
    <View className="flex-row items-center mt-3">
      <Feather name="calendar" size={12} color="#9CA3AF" />
      <Text className="text-xs text-gray-400 dark:text-gray-500 ml-1">{date}</Text>
    </View>
  )
}
