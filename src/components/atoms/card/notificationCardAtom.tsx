import { Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
  message: string;
  time: string;
  actionText: string;
  onActionPress: () => void;
};

export const NotificationCard = ({ message, time, actionText, onActionPress }: Props) => (
  <View className="bg-white rounded-2xl p-4 shadow-md mx-2 border border-gray-200">
    <View className="flex-row justify-between items-start">
      <View className="flex-1 pr-4">
        <Text className="text-sm text-gray-800 font-medium">{message}</Text>
        <Text className="text-xs text-gray-500 mt-1">{time}</Text>
      </View>
      <Feather name="bell" size={20} color="#10B981" />
    </View>

    <TouchableOpacity
      onPress={onActionPress}
      className="mt-3 self-end bg-green-100 px-4 py-1.5 rounded-full"
    >
      <Text className="text-green-600 text-sm font-semibold">{actionText}</Text>
    </TouchableOpacity>
  </View>
);
