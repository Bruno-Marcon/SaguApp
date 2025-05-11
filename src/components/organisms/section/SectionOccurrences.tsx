import { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import OccurrenceCardAtom from '../../atoms/card/cardAtom'
import OccurrenceDetailModal from '../../molecules/modal/occurrenceDatailModal'

interface OccurrenceItem {
  title: string
  description: string
  isNew?: boolean
  authorName?: string
  category?: string
  status?:string
  createdAt?: Date | string
}

interface SectionOccurrencesProps {
  sectionTitle: string
  items: readonly OccurrenceItem[] | OccurrenceItem[]
  onPress: () => void
}

export default function SectionOccurrences({
  sectionTitle,
  items,
  onPress
}: SectionOccurrencesProps) {
  const [selectedOccurrence, setSelectedOccurrence] = useState<OccurrenceItem | null>(null)

  return (
    <View className="mt-3">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-bold text-gray-800">{sectionTitle}</Text>
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          <Text className="text-sm text-blue-600">Ver todas</Text>
        </TouchableOpacity>
      </View>

      {items.map((item, index) => (
        <OccurrenceCardAtom
          key={index}
          title={item.title}
          description={item.description}
          authorName={item.authorName}
          isNew={item.isNew}
          status = {item.status}
          category={item.category}
          createdAt={item.createdAt}
          onPress={() => setSelectedOccurrence(item)}
        />
      ))}

      {selectedOccurrence && (
        <OccurrenceDetailModal
          visible={true}
          onClose={() => setSelectedOccurrence(null)}
          title={selectedOccurrence.title}
          description={selectedOccurrence.description}
        />
      )}
    </View>
  )
}