import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';  // Importando ícones do Expo

interface OccurrenceCardProps {
  title: string;
  description: string;
}

export default function OccurrenceCard({ title, description }: OccurrenceCardProps) {
  return (
    <View className="flex-row items-start space-x-3 mb-4 bg-white p-4 rounded-xl shadow-sm">
      <Feather name="alert-circle" size={24} color="#DC2626" /> {/* Usando o ícone 'alert-circle' */}
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-700">{title}</Text>
        <Text className="text-sm text-gray-500">{description}</Text>
      </View>
    </View>
  );
}
