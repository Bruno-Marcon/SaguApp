import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface Props {
  title: string;
  onClose: () => void;
}

export default function OccurrenceModalHeader({ title, onClose }: Props) {
  return (
    <View className="flex-row justify-between items-center mb-4">
      <Text className="text-xl font-bold text-gray-800">{title}</Text>
      <TouchableOpacity onPress={onClose}>
        <Feather name="x" size={24} color="#4B5563" />
      </TouchableOpacity>
    </View>
  );
}
