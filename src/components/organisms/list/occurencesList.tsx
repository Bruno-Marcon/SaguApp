import { View, Text } from "react-native"
import { Feather } from "@expo/vector-icons"
import OccurrenceCardAtom from "../../atoms/card/cardAtom"
import { OccurrenceItem } from "@//utils/adapters/occurrence/occurrenceAdapter"
import Loading from "../../atoms/indicators/loadingAtom"

type OccurrenceData = {
  id: string
  attributes: {
    title: string
    description: string
    created_at: string
    status?: string
  }
  relationships: {
    student?: {
      data: {
        id: string
        attributes: {
          name: string
        }
      }
    }
    relator?: {
      data: {
        id: string
        attributes: {
          name: string
        }
      }
    }
  }
}

type Props = {
  data: OccurrenceData
  title: string
  linkText: string
  onPressLink: () => void
  type: 'authorization' | 'occurrence'
}

type OccurrencesListProps = {
  occurrences: OccurrenceData[]
  loading: boolean
}

export default function OccurrencesList({ occurrences, loading }: OccurrencesListProps) {
  if (loading) {
    return <Loading/>
  }

  return (
    <View className="mb-8">
      {occurrences.length > 0 ? (
        occurrences.map((occurrence) => (
          <OccurrenceCardAtom
            key={occurrence.id} // Uso de occurrence.id como key
            title={occurrence.attributes.title}
            description={occurrence.attributes.description}
            createdAt={occurrence.attributes.created_at}
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
