import { View } from 'react-native'
import OccurrenceCardAtom from '../../../atoms/card/OccurrenceCard'

interface OccurrenceItem {
  title: string
  description: string
}

interface OccurrenceListMoleculeProps {
  items: ReadonlyArray<OccurrenceItem>
  onItemPress?: (item: OccurrenceItem) => void
}

export default function OccurrenceListMolecule({ items, onItemPress }: OccurrenceListMoleculeProps) {
  return (
    <View>
      {items.map((item, index) => (
        <OccurrenceCardAtom
          key={index}
          title={item.title}
          description={item.description}
          onPress={() => onItemPress?.(item)}
        />
      ))}
    </View>
  )
}