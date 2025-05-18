import { View, TouchableOpacity, Text } from 'react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Authorization } from '../../../../types/authorizations';
import AuthorizationCardHeader from '../header/authorizationCardHeaderMolecules';
import { Feather } from '@expo/vector-icons'; // ou outro pacote que você preferir

type Props = {
  authorization: Authorization;
  onPress?: () => void;
};

export default function AuthorizationCard({ authorization, onPress }: Props) {
  const formattedDate = format(new Date(authorization.attributes.created_at), 'dd/MM/yyyy HH:mm', {
    locale: ptBR,
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityLabel={`Autorização: ${authorization.attributes.description}, status: ${authorization.attributes.status}`}
      className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-4"
    >
      {/* Borda lateral azul */}
      <View
        className="w-[5px] rounded-tl-3xl rounded-bl-3xl absolute left-0 top-0 bottom-0"
        style={{ backgroundColor: '#3B82F6' }}
      />

      <View className="p-4 pl-6 flex-row items-start gap-x-3">
        {/* Ícone de autorização */}
        <View className="mt-1">
          <Feather name="file-text" size={20} color="#3B82F6" />
        </View>

        {/* Conteúdo */}
        <View className="flex-1">
          <AuthorizationCardHeader
            title={authorization.attributes.description}
            status={authorization.attributes.status}
          />
          <Text className="text-sm text-gray-600 mt-0.5 leading-snug" numberOfLines={2}>
            {authorization.attributes.description}
          </Text>
          <View className="flex-row items-center mt-3">
            <Text className="text-xs text-gray-400">{formattedDate}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
