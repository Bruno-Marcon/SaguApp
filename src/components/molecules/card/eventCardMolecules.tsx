import { View, TouchableOpacity, useColorScheme } from 'react-native';
import { TextAtom } from '../../atoms/text/textAtom';
import { FontAwesome, Feather } from '@expo/vector-icons';

type Props = {
  title: string;
  subtitle?: string;
  time?: string;
  dateString?: string;
  author?: string;
  onPress?: () => void;
  onConfirm?: () => void;
  onReject?: () => void; // Novo botão de Recusar
};

export const EventCard = ({
  title,
  subtitle,
  time,
  dateString,
  author,
  onPress,
  onConfirm,
  onReject,
}: Props) => {
  const theme = useColorScheme();
  const isDark = theme === 'dark';

  const formatDateString = (isoDate: string) => {
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
  };

  const showActionButtons = author === 'waiting';

  const subtitleColor = isDark ? '#D1D5DB' : '#374151';
  const borderColor = isDark ? '#27272A' : '#E5E7EB';
  const backgroundColor = isDark ? '#18181B' : '#FFFFFF';
  const titleColor = isDark ? '#FFFFFF' : '#111827';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{ backgroundColor, borderColor }}
      className="rounded-2xl p-4 border shadow-sm my-2"
    >
      <View className="flex-row items-center mb-2">
        <FontAwesome name="calendar" size={20} color="#4CAF50" />
        <TextAtom variant="title" className="ml-2" style={{ color: titleColor }}>
          {title}
        </TextAtom>
      </View>

      {subtitle && (
        <View className="flex-row items-center mb-1">
          <Feather name="book" size={16} color="#6B7280" />
          <TextAtom variant="body" className="ml-2" style={{ color: subtitleColor }}>
            {subtitle}
          </TextAtom>
        </View>
      )}

      {author && (
        <View className="flex-row items-center mb-1">
          <Feather name="user" size={16} color="#6B7280" />
          <TextAtom variant="body" className="ml-2" style={{ color: subtitleColor }}>
            {author === 'waiting' ? 'Aguardando' : 'Confirmado'}
          </TextAtom>
        </View>
      )}

      {(dateString || time) && (
        <View className="flex-row justify-between mt-2">
          {dateString && (
            <View className="flex-row items-center">
              <Feather name="calendar" size={16} color="#4CAF50" />
              <TextAtom variant="body" className="ml-1 text-sm text-green-600">
                {formatDateString(dateString)}
              </TextAtom>
            </View>
          )}
          {time && (
            <View className="flex-row items-center">
              <Feather name="clock" size={16} color="#EF4444" />
              <TextAtom variant="body" className="ml-1 text-sm text-red-500">
                {time}
              </TextAtom>
            </View>
          )}
        </View>
      )}

      {showActionButtons && (
        <View className="flex-row gap-2 mt-4">
          <TouchableOpacity
            onPress={onConfirm}
            className="flex-1 bg-green-600 rounded-lg py-2"
          >
            <TextAtom variant="body" className="text-white text-center font-medium">
              Confirmar
            </TextAtom>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onReject}
            className="flex-1 bg-red-600 rounded-lg py-2"
          >
            <TextAtom variant="body" className="text-white text-center font-medium">
              Recusar
            </TextAtom>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};
