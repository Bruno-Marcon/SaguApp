import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { PrimaryTitle } from '../../atoms/title/primaryTitle'
import CardAtom from '../../atoms/card/cardAtom'
import { Occurrence } from '../../../../types/occurrence'

type Props = {
  data: Occurrence[]
  title: string
  linkText: string
  onPressLink: () => void
  onCardPress?: (occurrence: Occurrence) => void
}

export const SectionOccurrences = ({
  data,
  title,
  linkText,
  onPressLink,
  onCardPress,
}: Props) => {
  const latestOccurrences = [...data]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3) // Limita aos 3 mais recentes

  return (
    <View className="mt-6 px-4 z-0 overflow-visible">
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center gap-x-2">
          <Feather name="alert-circle" size={20} color="#F87171" />
          <Text className="text-xl font-extrabold text-gray-800 tracking-tight">
            {title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onPressLink}
          className="flex-row items-center bg-green-50 px-3 py-1 rounded-full"
        >
          <Text className="text-sm font-semibold text-green-600 mr-1">{linkText}</Text>
          <Feather name="arrow-right" size={16} color="#16A34A" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={latestOccurrences}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 16,
          paddingBottom: 8,
          paddingTop: 2,
        }}
        style={{ zIndex: 0, overflow: 'visible' }}
        renderItem={({ item }) => (
          <CardAtom
            {...item}
            onPress={() => onCardPress?.(item)}
            className="w-[260px] transition-all duration-300 active:scale-95"
          />
        )}
      />
    </View>
  )
}
