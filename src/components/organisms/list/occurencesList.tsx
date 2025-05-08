import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Text } from 'react-native';
import OccurrenceCard from '../../molecules/section/occurence/occurrenceCard';

export default function OccurrencesList() {
  const occurrences = [
    {
      id: 1,
      title: 'Ocorrência #1',
      description: 'Descrição breve da ocorrência',
      date: '20/10/2024',
    },
    {
      id: 2,
      title: 'Ocorrência #2',
      description: 'Descrição breve da ocorrência',
      date: '19/10/2024',
    },
    {
      id: 3,
      title: 'Ocorrência #3',
      description: 'Descrição breve da ocorrência',
      date: '18/10/2024',
    },
  ];

  return (
    <View className="mb-8">
      {occurrences.length > 0 ? (
        occurrences.map((occurrence) => (
          <OccurrenceCard
            key={occurrence.id}
            title={occurrence.title}
            description={occurrence.description}
            date={occurrence.date}
            onViewPress={() => console.log('Visualizar ocorrência', occurrence.id)}
          />
        ))
      ) : (
        <View className="items-center justify-center py-8">
          <Feather name="inbox" size={48} color="#9ca3af" />
          <Text className="text-gray-500 mt-2">Nenhuma ocorrência encontrada</Text>
        </View>
      )}
      
      {/* Data de referência */}
      <View className="items-center mb-4">
        <Text className="text-gray-500">---</Text>
        <Text className="text-gray-500">20/10/2024</Text>
      </View>
    </View>
  );
}