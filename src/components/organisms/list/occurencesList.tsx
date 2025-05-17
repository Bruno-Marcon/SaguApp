import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Loading from '../../atoms/indicators/loadingAtom';
import CardAtomOccurrencesList from '../../atoms/card/cardAtomOccurences';
import { Occurrence } from '../../../../types/occurrence';

type OccurrencesListProps = {
  occurrences: Occurrence[];
  loading: boolean;
};

export default function OccurrencesList({ occurrences, loading }: OccurrencesListProps) {
  if (loading) {
    return (
      <View className="flex items-center justify-center py-20">
        <Loading />
        <Text className="mt-4 text-base text-gray-500 font-medium">
          Buscando ocorrências...
        </Text>
      </View>
    );
  }

  if (occurrences.length === 0) {
    return (
      <View className="flex items-center justify-center py-24 px-8 bg-white rounded-2xl shadow-sm border border-gray-100">
        <Feather name="inbox" size={48} color="#9CA3AF" />
        <Text className="text-lg font-semibold text-gray-600 mt-4">
          Nenhuma ocorrência encontrada
        </Text>
        <Text className="text-sm text-gray-400 mt-1 text-center">
          Ajuste os filtros para explorar outros resultados disponíveis.
        </Text>
      </View>
    );
  }

  return (
    <View className="mb-20 space-y-3">
      {occurrences.map((occurrence) => (
        <CardAtomOccurrencesList
          key={occurrence.id}
          id={occurrence.id}
          title={occurrence.title}
          description={occurrence.description}
          created_at={occurrence.created_at}
          status={occurrence.status}
          student_id={occurrence.student_id}
          kind={occurrence.kind}
          severity={occurrence.severity}
        />
      ))}
    </View>
  );
}
