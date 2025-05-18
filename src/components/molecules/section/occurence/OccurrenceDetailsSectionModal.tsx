import { View } from 'react-native';
import { formatDate } from '@//utils/dateUtils';
import { Occurrence } from '../../../../../types/occurrence';
import DetailLabel from '@//components/atoms/text/detailLabel';


interface Props {
  occurrence: Occurrence;
}

export default function OccurrenceDetailsSection({ occurrence }: Props) {
  return (
    <View className="border border-gray-200 rounded-xl p-4 space-y-2 mb-4">
      <DetailLabel label="Estudante" value={occurrence.student_name ?? '-'} />
      <DetailLabel label="Responsável" value={occurrence.responsible_name ?? '-'} />
      <DetailLabel label="Relator" value={occurrence.relator_name ?? '-'} />
      <DetailLabel
        label="Criado em"
        value={occurrence.created_at ? formatDate(occurrence.created_at) : '-'}
      />
      <DetailLabel label="Privacidade" value={occurrence.private ? 'Fechada' : 'Aberta'} />
      <DetailLabel label="Descrição" value={occurrence.description ?? '-'} />
    </View>
  );
}
