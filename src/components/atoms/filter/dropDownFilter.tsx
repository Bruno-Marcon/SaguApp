import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface DropdownFilterProps {
  label: string;
  value: string;
}

export default function DropdownFilter({ label, value }: DropdownFilterProps) {
  return (
    <View className="border border-gray-300 rounded-lg p-2 flex-1 mr-2">
      <Text className="text-gray-500 text-xs">{label}:</Text>
      <View className="flex-row items-center justify-between">
        <Text className="text-gray-800">{value}</Text>
        <Feather name="chevron-down" size={16} color="#6b7280" />
      </View>
    </View>
  );
}