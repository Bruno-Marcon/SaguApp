import { View, Text } from 'react-native';
import OccurrenceListMolecule from '../../molecules/section/occurence/ocurrenceList'

interface OccurrenceItem {
  title: string;
  description: string;
}

interface SectionOccurrencesProps {
  sectionTitle: string;
  items: OccurrenceItem[];
}

export default function SectionOccurrences({ sectionTitle, items }: SectionOccurrencesProps) {
  return (
    <View className="mt-3">
      <Text className="text-lg font-bold text-gray-800 mb-3">{sectionTitle}</Text>
      <OccurrenceListMolecule items={items} />
    </View>
  );
}
