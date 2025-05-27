import { View, TouchableOpacity } from 'react-native';
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
};

export const EventCard = ({
  title,
  subtitle,
  time,
  dateString,
  author,
  onPress,
  onConfirm,
}: Props) => {
  const formatDateString = (isoDate: string) => {
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
  };

  const showConfirmButton = author === 'waiting';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-gray-200 dark:border-neutral-700 shadow-md my-2"
    >
      <View className="flex-row items-center mb-2">
        <FontAwesome name="calendar" size={20} color="#4CAF50" />
        <TextAtom variant="title" className="text-black dark:text-white ml-2">
          {title}
        </TextAtom>
      </View>

      {subtitle && (
        <View className="flex-row items-center mb-1">
          <Feather name="book" size={16} color="#6B7280" />
          <TextAtom variant="body" className="text-gray-600 dark:text-gray-300 ml-2">
            {subtitle}
          </TextAtom>
        </View>
      )}

      {author && (
        <View className="flex-row items-center mb-1">
          <Feather name="user" size={16} color="#6B7280" />
          <TextAtom variant="body" className="text-gray-600 dark:text-gray-300 ml-2">
            {author === 'waiting' ? 'Aguardando' : 'Confirmado'}
          </TextAtom>
        </View>
      )}

      {(dateString || time) && (
        <View className="flex-row justify-between mt-2">
          {dateString && (
            <View className="flex-row items-center">
              <Feather name="calendar" size={16} color="#4CAF50" />
              <TextAtom variant="body" className="text-green-600 text-sm ml-1">
                {formatDateString(dateString)}
              </TextAtom>
            </View>
          )}
          {time && (
            <View className="flex-row items-center">
              <Feather name="clock" size={16} color="#EF4444" />
              <TextAtom variant="body" className="text-red-500 text-sm ml-1">
                {time}
              </TextAtom>
            </View>
          )}
        </View>
      )}

      {showConfirmButton && (
        <TouchableOpacity
          onPress={onConfirm}
          className="mt-4 bg-green-600 rounded-lg py-2"
        >
          <TextAtom variant="body" className="text-white text-center font-medium">
            Confirmar
          </TextAtom>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};
