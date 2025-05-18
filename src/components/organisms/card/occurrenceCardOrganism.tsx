import { View, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Occurrence } from '../../../../types/occurrence';
import KindIcon from '../../atoms/icons/kindIcon';
import OccurrenceCardHeader from '../../molecules/header/occurrenceCardHeaderMolecules';
import OccurrenceCardBody from '../../molecules/card/occurrenceCardBodyMolecules';
import OccurrenceCardMeta from '../../molecules/card/occurrenceCardMetaMolecules';

type Props = {
  occurrence: Occurrence;
  onPress?: () => void;
};

export default function OccurrenceCard({ occurrence, onPress }: Props) {
  const formattedTime = format(new Date(occurrence.created_at), 'dd/MM/yyyy HH:mm', {
    locale: ptBR,
  });

  const severityColorMap: Record<string, string> = {
    low: '#10B981',
    medium: '#F59E0B',
    high: '#EF4444',
  };

  const normalizedSeverity = occurrence.severity?.toLowerCase() ?? 'medium';
  const color = severityColorMap[normalizedSeverity] || '#F59E0B';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityLabel={`Ocorrência: ${occurrence.title}, status: ${occurrence.status}`}
      className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-4"
    >
      {/* Borda lateral colorida pela gravidade */}
      <View
        className="w-[5px] rounded-tl-3xl rounded-bl-3xl absolute left-0 top-0 bottom-0"
        style={{ backgroundColor: color }}
      />

      <View className="p-4 pl-6 flex-row items-start">
        {/* Ícone da ocorrência */}
        <View className="mr-4 mt-1">
          <KindIcon kind={occurrence.kind} color={color} />
        </View>

        {/* Conteúdo textual do card */}
        <View className="flex-1">
          <OccurrenceCardHeader
            title={occurrence.title}
            status={occurrence.status}
            severity={occurrence.severity}
          />
          <OccurrenceCardBody description={occurrence.description} />
          <OccurrenceCardMeta date={formattedTime} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
