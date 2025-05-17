import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { formatDate } from '@//utils/dateUtils';
import { Authorization } from '../../../../types/authorizations';

export type FeatherIconName = React.ComponentProps<typeof Feather>['name'];

interface CardAuthorizationAtomProps {
  authorization: Authorization;
  onPress?: () => void;
  iconName?: FeatherIconName;
  iconColor?: string;
  borderColor?: string;
  className?: string;
}

function isValidFeatherIconName(name: string): name is FeatherIconName {
  return name in Feather.glyphMap;
}

export default function CardAuthorizationAtom({
  authorization,
  iconName = 'file-text',
  iconColor = '#3B82F6',
  borderColor = '#3B82F6',
  className = '',
  onPress,
}: CardAuthorizationAtomProps) {
  const {
    attributes: { description, created_at, status },
  } = authorization;

  const formattedTime = formatDate(created_at);
  const validatedIconName: FeatherIconName = isValidFeatherIconName(iconName) ? iconName : 'file-text';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityLabel={`Autorização, status: ${status}`}
      className={`bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden ${className}`}
      style={{ width: 260 }}
    >
      {/* Borda lateral */}
      <View
        className="w-[5px] rounded-tl-3xl rounded-bl-3xl absolute left-0 top-0 bottom-0"
        style={{ backgroundColor: borderColor }}
      />

      <View className="p-4 pl-6 flex-row items-start">
        {/* Ícone */}
        <View className="mr-4 mt-1">
          <View className="bg-gray-100 p-2 rounded-xl">
            <Feather name={validatedIconName} size={22} color={iconColor} />
          </View>
        </View>

        {/* Conteúdo */}
        <View className="flex-1">
          {/* Título + Status */}
          <View className="flex-row justify-between items-start mb-1">
            <Text
              className="text-base font-bold text-gray-900 flex-1"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Autorização
            </Text>

            <View className="bg-blue-50 px-3 py-1 rounded-full shadow-sm">
              <Text className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">
                {status ?? 'N/A'}
              </Text>
            </View>
          </View>

          {/* Descrição */}
          <Text className="text-sm text-gray-600 mt-0.5 leading-snug" numberOfLines={2}>
            {description}
          </Text>

          {/* Data */}
          <View className="flex-row items-center mt-3">
            <Feather name="calendar" size={12} color="#9CA3AF" />
            <Text className="text-xs text-gray-400 ml-1">
              {formattedTime ?? ''}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
