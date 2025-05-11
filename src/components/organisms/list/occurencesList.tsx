import { View, Text } from "react-native"
import { Feather } from "@expo/vector-icons"
import OccurrenceCardAtom from "../../atoms/card/OccurrenceCard"
import { OccurrenceItem } from "@//utils/adapters/occurrence/occurrenceAdapter"

type OccurrencesListProps = {
  occurrences: OccurrenceItem[]
  loading: boolean
}

export default function OccurrencesList({ occurrences, loading }: OccurrencesListProps) {
  if (loading) {
    return <Text>Carregando...</Text>
  }

  return (
    <View className="mb-8">
      {occurrences.length > 0 ? (
        occurrences.map((occurrence) => (
          <OccurrenceCardAtom
            key={occurrence.id}
            title={occurrence.title}
            description={occurrence.description}
            createdAt={occurrence.createdAt}
            onPress={() => console.log('Visualizar ocorrência', occurrence.id)}
          />
        ))
      ) : (
        <View className="items-center justify-center py-8">
          <Feather name="inbox" size={48} color="#9ca3af" />
          <Text className="text-gray-500 mt-2">Nenhuma ocorrência encontrada</Text>
        </View>
      )}
    </View>
  )
}
