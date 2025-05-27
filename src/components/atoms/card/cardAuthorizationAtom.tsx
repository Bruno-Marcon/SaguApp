import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { formatDate } from '@//utils/dateUtils';
import { Authorization } from '../../../../types/authorizations';
import TagGroup from '../../molecules/badge/tagGroup';

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
  iconColor = '#2563EB',
  borderColor = '#2563EB',
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
      className={`bg-white dark:bg-neutral-900 rounded-3xl border border-gray-200 dark:border-neutral-700 overflow-hidden ${className}`}
      style={{ width: 270 }}
    >
      {/* Faixa lateral */}
      <View
        className="absolute top-0 bottom-0 left-0 w-[5px] rounded-l-3xl"
        style={{ backgroundColor: borderColor }}
      />

      <View className="p-4 pl-6">
        {/* Tag no topo */}
        <View className="flex-row justify-start items-center space-x-2 mb-2">
          <TagGroup status={status} />
        </View>

        <View className="flex-row items-start">
          {/* Ícone */}
          <View className="bg-gray-100 dark:bg-neutral-800 p-2 rounded-xl mr-4">
            <Feather name={validatedIconName} size={20} color={iconColor} />
          </View>

          {/* Conteúdo */}
          <View className="flex-1">
            <Text
              className="text-xl font-bold text-gray-900 dark:text-white"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Autorização
            </Text>

            <Text
              className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-snug"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {description}
            </Text>

            <View className="flex-row items-center mt-3">
              <Feather name="calendar" size={12} color="#9CA3AF" />
              <Text className="text-xs text-gray-400 dark:text-gray-500 ml-1">
                {formattedTime ?? ''}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
