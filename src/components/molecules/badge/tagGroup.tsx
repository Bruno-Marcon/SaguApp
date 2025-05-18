import { View } from 'react-native';
import Tag from '../../atoms/badge/tag';

interface Props {
  status?: string;
  kind?: string;
  severity?: string;
}

export default function TagGroup({ status, kind, severity }: Props) {
  return (
    <View className="flex-row flex-wrap gap-2 mb-4">
      <Tag label={`Status: ${status ?? '-'}`} color="blue" />
      <Tag label={`Tipo: ${kind ?? '-'}`} color="yellow" />
      <Tag label={`Gravidade: ${severity ?? '-'}`} color="red" />
    </View>
  );
}
