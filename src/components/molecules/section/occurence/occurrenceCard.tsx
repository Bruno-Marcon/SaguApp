import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface OccurrenceCardProps {
  title: string;
  description: string;
  date: string;
  onViewPress: () => void;
}

export default function OccurrenceCard({ 
  title, 
  description, 
  date, 
  onViewPress 
}: OccurrenceCardProps) {
  return (
    <View className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100">
      <Text className="text-lg font-semibold text-gray-800 mb-1">{title}</Text>
      <Text className="text-gray-600 mb-3">{description}</Text>
      
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-500 text-sm">{date}</Text>
        <TouchableOpacity 
          className="flex-row items-center"
          onPress={onViewPress}
        >
          <Text className="text-green-500 mr-1">Visualizar</Text>
          <Feather name="chevron-right" size={16} color="#10b981" />
        </TouchableOpacity>
      </View>
    </View>
  );
}