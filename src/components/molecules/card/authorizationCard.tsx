import { View, TouchableOpacity, Text } from 'react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Authorization } from '../../../../types/authorizations';
import { Feather } from '@expo/vector-icons';
import TagGroup from '../badge/tagGroup';

type Props = {
  authorization: Authorization;
  onPress?: () => void;
};

export default function AuthorizationCard({ authorization, onPress }: Props) {
  const formattedDate = format(
    new Date(authorization.attributes.created_at),
    'dd/MM/yyyy HH:mm',
    { locale: ptBR }
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="bg-white dark:bg-neutral-900 rounded-3xl shadow-xl border border-gray-100 dark:border-neutral-700 overflow-hidden mb-4"
    >
      {/* Borda lateral azul */}
      <View
        className="w-[5px] rounded-tl-3xl rounded-bl-3xl absolute left-0 top-0 bottom-0"
        style={{ backgroundColor: '#3B82F6' }}
      />

      <View className="p-4 pl-6 flex-row items-start gap-x-3">
        <View className="mt-1">
          <Feather name="file-text" size={20} color="#3B82F6" />
        </View>

        <View className="flex-1">
          <View className="flex-row justify-start">
            <TagGroup status={authorization.attributes.status} />
          </View>

          <Text
            className="text-xl font-bold text-gray-900 dark:text-white mb-2"
            numberOfLines={1}
          >
            {authorization.attributes.description}
          </Text>

          <Text className="text-sm text-gray-600 dark:text-gray-300 leading-snug" numberOfLines={2}>
            {authorization.attributes.description}
          </Text>

          <View className="flex-row items-center mt-3">
            <Feather name="calendar" size={12} color="#9CA3AF" />
            <Text className="text-xs text-gray-400 ml-1">{formattedDate}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
