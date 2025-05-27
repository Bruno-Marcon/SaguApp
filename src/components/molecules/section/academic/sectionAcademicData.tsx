import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export const SectionAcademicData = () => {
  const router = useRouter();

  const data = [
    {
      icon: 'book-open',
      title: 'Média Geral',
      value: '8.7',
      color: '#3B82F6',
    },
    {
      icon: 'calendar',
      title: 'Frequência',
      value: '92%',
      color: '#10B981',
    },
    {
      icon: 'trending-up',
      title: 'Desempenho',
      value: 'Ótimo',
      color: '#F59E0B',
    },
  ];

  return (
    <View className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl px-6 py-5 mb-4 mt-6">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-gray-800 dark:text-white">
          Dados Acadêmicos
        </Text>

        <TouchableOpacity
          onPress={() => router.push('/(panel)/reportCard/page')}
          className="flex-row items-center"
        >
          <Text className="text-sm font-semibold text-blue-600 dark:text-blue-400 mr-1">
            Ver Boletim
          </Text>
          <Feather name="arrow-right" size={16} color="#2563EB" />
        </TouchableOpacity>
      </View>

      {/* Cards */}
      <View className="flex-row justify-between">
        {data.map((item) => (
          <View
            key={item.title}
            className="flex-1 items-center mx-1 bg-gray-50 dark:bg-neutral-800 rounded-xl p-4"
          >
            <View
              className="p-2 rounded-full mb-2"
              style={{ backgroundColor: item.color + '20' }}
            >
              <Feather name={item.icon as any} size={20} color={item.color} />
            </View>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              {item.title}
            </Text>
            <Text className="text-base font-semibold text-gray-800 dark:text-white mt-1">
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
