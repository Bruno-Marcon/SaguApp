import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import CardAuthorizationAtom from "../../atoms/card/cardAuthorizationAtom";
import Loading from "../../atoms/indicators/loadingAtom";
import { Authorization } from "../../../../types/authorizations";

interface AuthorizationsListProps {
  authorizations: Authorization[];
  loading: boolean;
}

export default function AuthorizationsList({ authorizations, loading }: AuthorizationsListProps) {
  if (loading) return <Loading />;

  return (
    <View className="mb-8">
      {authorizations.length > 0 ? (
        authorizations.map((authorization) => (
          <CardAuthorizationAtom
            key={authorization.id}
            authorization={authorization}
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
  );
}