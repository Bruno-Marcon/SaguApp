import { View, Text } from "react-native"
import { Feather } from "@expo/vector-icons"
import OccurrenceCardAtom from "../../atoms/card/OccurrenceCard"

interface OccurrencesListProps {
  occurrences: any[]
}

export default function OccurrencesList({ occurrences }: OccurrencesListProps) {
  return (
    <View className="mb-8">
      {occurrences.length > 0 ? (
        occurrences.map((item) => (
          <OccurrenceCardAtom
            key={item.id}
            title={item.title}
            description={item.description}
            createdAt={item.date}
            authorName={item.author}
            status={item.status}
            category={item.category}
            onPress={() => console.log("Visualizar ocorrência", item.id)}
          />
        ))
      ) : (
        <View className="items-center justify-center py-8">
          <Feather name="inbox" size={48} color="#9ca3af" />
          <Text className="text-gray-500 mt-2">Nenhuma ocorrência encontrada</Text>
        </View>
      )}

      <View className="items-center mb-4">
        <Text className="text-gray-500">---</Text>
        <Text className="text-gray-500">20/10/2024</Text>
      </View>
    </View>
  )
}
