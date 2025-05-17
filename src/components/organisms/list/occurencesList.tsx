import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import OccurrenceCardAtom from '../../atoms/card/cardAtom';
import Loading from '../../atoms/indicators/loadingAtom';
import { Occurrence } from '../../../../types/occurrence';

type OccurrencesListProps = {
  occurrences: Occurrence[];
  loading: boolean;
};

export default function OccurrencesList({ occurrences, loading }: OccurrencesListProps) {
  if (loading) return <Loading />;

  return (
    <View className="mb-10">
      {occurrences.length > 0 ? (
        <View className="space-y-3">
          {occurrences.map((occurrence) => (
            <OccurrenceCardAtom
              key={occurrence.id}
              title={occurrence.title}
              description={occurrence.description}
              created_at={occurrence.created_at}
              status={occurrence.status}
              student_id={occurrence.student_id}
              kind={occurrence.kind}
              severity={occurrence.severity}
              id={occurrence.id}
            />
          ))}
        </View>
      ) : (
        <View className="flex items-center justify-center py-16 opacity-70">
          <Feather name="inbox" size={50} color="#9CA3AF" />
          <Text className="text-base text-gray-500 mt-3 font-medium">
            Nenhuma ocorrência encontrada
          </Text>
        </View>
      )}
    </View>
  );
}
