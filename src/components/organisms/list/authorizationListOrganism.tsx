import { View, Text } from "react-native"
import { Feather } from "@expo/vector-icons"
import OccurrenceCardAtom from "../../atoms/card/cardAtom"
import { AuthorizationItem } from "../../../../types/authorizations"
import Loading from "../../atoms/indicators/loadingAtom"

type AuthorizationsListProps = {
  authorizations: AuthorizationItem[]
  loading: boolean
}

export default function AuthorizationsList({ authorizations, loading }: AuthorizationsListProps) {
  if (loading) {
    return <Loading />
  }

  return (
    <View className="mb-8">
      {authorizations.length > 0 ? (
        authorizations.map((authorization, index) => (
          <OccurrenceCardAtom
            key={authorization.id || index}
            title={authorization.title}
            description={authorization.description}
            createdAt={authorization.createdAt}
            onPress={() => console.log('Visualizar autorização', authorization.id)}
          />
        ))
      ) : (
        <View className="items-center justify-center py-8">
          <Feather name="inbox" size={48} color="#9ca3af" />
          <Text className="text-gray-500 mt-2">Nenhuma autorização encontrada</Text>
        </View>
      )}
    </View>
  )
}
