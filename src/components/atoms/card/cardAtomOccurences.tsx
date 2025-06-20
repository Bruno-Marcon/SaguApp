import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { formatDate } from '@//utils/dateUtils';
import { Occurrence } from '../../../../types/occurrence';

interface CardAtomProps extends Occurrence {
  onPress?: () => void;
  iconName?: keyof typeof Feather.glyphMap;
  iconColor?: string;
  borderColor?: string;
  className?: string;
}

export default function CardAtomOccurrencesList({
  title,
  description,
  created_at,
  status = 'Aberto',
  kind,
  severity,
  iconName,
  iconColor,
  borderColor,
  className = '',
  onPress,
}: CardAtomProps) {
  const formattedTime = formatDate(created_at);

  const severityColorMap: Record<string, string> = {
    low: '#10B981',      // Verde
    medium: '#F59E0B',   // Amarelo
    high: '#EF4444',     // Vermelho
  };

  const kindIconMap: Record<string, keyof typeof Feather.glyphMap> = {
    discipline: 'alert-triangle',
    academic: 'book-open',
    attendance: 'clock',
    default: 'file-text',
  };

  const finalColor = severityColorMap[severity || ''] || '#F59E0B';
  const finalIcon = kindIconMap[kind || ''] || kindIconMap.default;

  const statusColorClass =
    status === 'Fechado'
      ? 'bg-gray-100 text-gray-500'
      : 'bg-orange-100 text-orange-600';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityLabel={`Ocorrência: ${title}, status: ${status}`}
      className={`bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden ${className}`}
      style={{ width: '100%' }}
    >
      {/* Borda lateral colorida */}
      <View
        className="w-[5px] rounded-tl-3xl rounded-bl-3xl absolute left-0 top-0 bottom-0"
        style={{ backgroundColor: borderColor || finalColor }}
      />

      <View className="p-4 pl-6 flex-row items-start">
        {/* Ícone da ocorrência */}
        <View className="mr-4 mt-1">
          <View className="bg-gray-100 p-2 rounded-xl">
            <Feather name={iconName || finalIcon} size={22} color={iconColor || finalColor} />
          </View>
        </View>

        {/* Conteúdo */}
        <View className="flex-1">
          {/* Título e status */}
          <View className="flex-row justify-between items-start mb-1">
            <Text
              className="text-base font-bold text-gray-900 flex-1"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>

            <View className={`px-3 py-1 rounded-full shadow-sm ${statusColorClass}`}>
              <Text className="text-[10px] font-bold uppercase tracking-wide">
                {status}
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
            <Text className="text-xs text-gray-400 ml-1">{formattedTime}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
