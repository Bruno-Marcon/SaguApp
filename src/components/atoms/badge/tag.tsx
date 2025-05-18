import { View, Text } from 'react-native';

interface Props {
  label: string;
  color: 'blue' | 'red' | 'yellow';
}

export default function Tag({ label, color }: Props) {
  const colors = {
    blue: ['bg-blue-100', 'text-blue-800'],
    red: ['bg-red-100', 'text-red-800'],
    yellow: ['bg-yellow-100', 'text-yellow-800'],
  }[color];

  return (
    <View className={`px-3 py-1 rounded-full ${colors[0]}`}>
      <Text className={`text-xs font-bold ${colors[1]}`}>{label}</Text>
    </View>
  );
}
