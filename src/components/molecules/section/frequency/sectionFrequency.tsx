import { View, Text, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

const frequencies = [
  { name: 'Matemática', frequency: 95 },
  { name: 'Português', frequency: 98 },
  { name: 'História', frequency: 92 },
  { name: 'Geografia', frequency: 96 },
  { name: 'Ciências', frequency: 99 },
  { name: 'Inglês', frequency: 94 },
];

export const SectionFrequency = () => {
  return (
    <View className="border border-gray-200 rounded-2xl px-5 py-5 mb-6 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-gray-800">📊 Frequência por Matéria</Text>
        <Feather name="bar-chart-2" size={18} color="#2563EB" />
      </View>

      {/* Table Header */}
      <View className="flex-row bg-gray-50 rounded-lg px-4 py-2 mb-2">
        <Text className="flex-1 text-xs text-gray-500">Disciplina</Text>
        <Text className="w-24 text-xs text-gray-500 text-right">Frequência (%)</Text>
      </View>

      {/* Table Body */}
      <ScrollView>
        {frequencies.map((item, index) => (
          <View
            key={item.name}
            className={`flex-row px-4 py-3 items-center rounded-xl ${
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            }`}
          >
            <Text className="flex-1 text-sm text-gray-800">{item.name}</Text>
            <View
              className={`w-24 py-1 rounded-full ${
                item.frequency >= 90 ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <Text
                className={`text-center text-sm font-semibold ${
                  item.frequency >= 90 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {item.frequency}%
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="mt-4">
        <Text className="text-xs text-gray-500">
          🔍 Acompanhe sua presença nas disciplinas.
        </Text>
      </View>
    </View>
  );
};
