import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { PrimaryTitle } from '../../atoms/title/primaryTitle'
import CardAtom from '../../atoms/card/cardAtom'

type Props = {
  data: Array<{
    title: string
    description: string
    createdAt?: Date | string
    authorName?: string
    studentName?: string
    parentName?: string
    status?: string
    category?: string
    iconName?: string
    iconColor?: string
    borderColor?: string
  }>
  title: string
  linkText: string
  onPressLink: () => void
  type: 'authorization' | 'occurrence'
}

export const SectionWithCarousel = ({
  data,
  title,
  linkText,
  onPressLink,
  type,
}: Props) => {
  return (
    <View>
      <View className="flex-row justify-between items-center">
        <PrimaryTitle name={title} className="text-2xl font-bold text-gray-800" />
        <TouchableOpacity className="flex-row items-center" onPress={onPressLink}>
          <Text className="text-sm text-green-600 mr-1">{linkText}</Text>
          <Feather name="chevron-right" size={20} color="#16a34a" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(_, index) => `carousel-item-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8, flexGrow: 0 }}
        renderItem={({ item }) => (
          <CardAtom
            title={item.title}
            description={item.description}
            createdAt={item.createdAt}
            authorName={item.authorName}
            status={item.status}
            category={item.category}
            iconName={item.iconName}
            iconColor={item.iconColor}
            borderColor={item.borderColor}
            studentName={item.studentName}
            parentName={item.parentName}
          />
        )}
      />
    </View>
  )
}