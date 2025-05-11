import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { OccurrenceItem } from '@//utils/adapters/occurrence/occurrenceAdapter'
import OccurrenceCardAtom from '../../atoms/card/OccurrenceCard'

type Props = {
  occurrences: OccurrenceItem[];
  occurrencesLoading: boolean;
  occurrencesError: string | null;
  title: string;
  linkText: string;
  onPressLink: () => void;
};

export const OccurrenceSectionWithCarousel = ({
  occurrences,
  title,
  linkText,
  onPressLink,
}: Props) => {
  return (
    <View>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-semibold text-gray-800">{title}</Text>

        <TouchableOpacity className="flex-row items-center" onPress={onPressLink}>
          <Text className="text-sm text-blue-900 mr-1">{linkText}</Text>
          <Feather name="chevron-right" size={20} color="#1E40AF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={occurrences}
        keyExtractor={(_, index) => `carousel-item-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <View className="mr-4 w-96">
            <OccurrenceCardAtom
              title={item.title}
              description={item.description}
              createdAt={item.createdAt}
              authorName={item.authorName}
              isNew={item.isNew}
              status={item.status}
              category={item.category}
            />
          </View>
        )}
      />
    </View>
  )
}
