import { View } from 'react-native'
import { TextAtom } from '../../atoms/text/textAtom'
import { format } from 'date-fns'
import { FontAwesome, Feather } from '@expo/vector-icons'

type Props = {
  title: string
  subtitle?: string
  time: string
  date: Date
  author?: string
}

export const EventCard = ({ title, subtitle, time, date, author }: Props) => {
  const formatDate = (date: Date) => format(date, 'dd/MM/yyyy')

  return (
    <View className="bg-white rounded-2xl p-4 border border-gray-200 shadow-md my-2">
      <View className="flex-row items-center mb-2">
        <FontAwesome name="calendar" size={20} color="#4CAF50" />
        <TextAtom variant="title" className="text-black ml-2">
          {title}
        </TextAtom>
      </View>

      {subtitle && (
        <View className="flex-row items-center mb-1">
          <Feather name="book" size={16} color="#6B7280" />
          <TextAtom variant="body" className="text-gray-600 ml-2">
            {subtitle}
          </TextAtom>
        </View>
      )}

      {author && (
        <View className="flex-row items-center mb-1">
          <Feather name="user" size={16} color="#6B7280" />
          <TextAtom variant="body" className="text-gray-600 ml-2">
            {author}
          </TextAtom>
        </View>
      )}

      <View className="flex-row justify-between mt-2">
        <View className="flex-row items-center">
          <Feather name="calendar" size={16} color="#4CAF50" />
          <TextAtom variant="body" className="text-green-600 text-sm ml-1">
            {formatDate(date)}
          </TextAtom>
        </View>
        <View className="flex-row items-center">
          <Feather name="clock" size={16} color="#EF4444" />
          <TextAtom variant="body" className="text-red-500 text-sm ml-1">
            {time}
          </TextAtom>
        </View>
      </View>
    </View>
  )
}
