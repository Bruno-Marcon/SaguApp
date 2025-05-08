import { View, Text } from 'react-native';
import { useState } from 'react';
import FilterButton from '../../atoms/button/filterButton';

export default function OccurrencesFilter() {
  const [selectedFilter, setSelectedFilter] = useState<'pending' | 'completed'>('pending');

  return (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-gray-800 mb-2">Filtrar</Text>
      <View className="flex-row space-x-4">
        <FilterButton 
          label="Pendentes" 
          active={selectedFilter === 'pending'} 
          onPress={() => setSelectedFilter('pending')} 
        />
        <FilterButton 
          label="Concluídas" 
          active={selectedFilter === 'completed'} 
          onPress={() => setSelectedFilter('completed')} 
        />
      </View>
    </View>
  );
}