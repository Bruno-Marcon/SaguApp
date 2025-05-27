import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { formatDate } from '@//utils/dateUtils';
import { Occurrence } from '../../../../types/occurrence';
import TagGroup from '../../molecules/badge/tagGroup';

interface CardAtomProps {
  occurrence: Occurrence;
  onPress?: () => void;
  iconName?: keyof typeof Feather.glyphMap;
  iconColor?: string;
  borderColor?: string;
  className?: string;
}

export default function CardAtom({
  occurrence,
  iconName,
  iconColor,
  borderColor,
  className = '',
  onPress,
}: CardAtomProps) {
  const { title, description, created_at, status, kind, severity } = occurrence.attributes;

  const formattedTime = formatDate(created_at);

  const severityColorMap: Record<string, string> = {
    low: '#10B981',    // Verde
    medium: '#F59E0B', // Amarelo
    high: '#EF4444',   // Vermelho
  };

  const kindIconMap: Record<string, keyof typeof Feather.glyphMap> = {
    discipline: 'alert-triangle',
    academic: 'book-open',
    attendance: 'clock',
    default: 'file-text',
  };

  const finalColor = severityColorMap[severity] || '#3B82F6';
  const finalIcon = kindIconMap[kind] || kindIconMap.default;

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
        style={{ backgroundColor: borderColor || finalColor }}
      />

      <View className="p-4 pl-6">
        {/* Tags */}
        <View className="flex-row justify-start items-center space-x-2 mb-2">
          <TagGroup status={status} />
          <TagGroup kind={kind} />
        </View>

        {/* Header */}
        <View className="flex-row items-start">
          <View className="bg-gray-100 dark:bg-neutral-800 p-2 rounded-xl mr-4">
            <Feather name={iconName || finalIcon} size={20} color={iconColor || finalColor} />
          </View>

          <View className="flex-1">
            <Text
              className="text-xl font-bold text-gray-900 dark:text-white"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
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
              <Text className="text-xs text-gray-400 dark:text-gray-500 ml-1">{formattedTime}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
