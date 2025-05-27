import { View, Text } from 'react-native';

interface Props {
  label: string;
  value: string;
}

export default function DetailLabel({ label, value }: Props) {
  return (
    <View className="flex-row justify-between">
      <Text className="text-gray-500 dark:text-gray-400">{label}</Text>
      <Text className="font-medium text-right text-gray-800 dark:text-white">{value}</Text>
    </View>
  );
}
