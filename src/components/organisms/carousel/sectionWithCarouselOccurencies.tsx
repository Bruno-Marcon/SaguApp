import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { PrimaryTitle } from '../../atoms/title/primaryTitle'
import CardAtom from '../../atoms/card/cardAtom'

type Props = {
  data: Array<{
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
  }>
  title: string
  linkText: string
  onPressLink: () => void
  type: 'authorization' | 'occurrence'
}

export const SectionWithCarouselOccurences = ({
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
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 0 }}
        renderItem={({ item }) => {
          const title = item.attributes?.title || "Sem título"
          const description = item.attributes?.description || "Sem descrição disponível"
          const status = item.attributes?.status || "Status desconhecido"
          const createdAt = item.attributes?.created_at || new Date().toString()

          const studentName = item.relationships?.student?.data?.attributes?.name
          const authorName = item.relationships?.relator?.data?.attributes?.name || "Relator desconhecido"

          return (
            <View style={{ width: 250 }}> {/* Defina a largura do card */}
              <CardAtom
                title={title}
                description={description}
                createdAt={createdAt}
                status={status}
                authorName={authorName}
                studentName={studentName}
              />
            </View>
          )
        }}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
      />
    </View>
  )
}
