import { View, Text } from 'react-native'
import { Occurrence } from '../../../../types/occurrence'
import OccurrenceCardOrganism from '../card/occurrenceCardOrganism'

type Props = {
  title: string
  data: Occurrence[]
}

export default function OccurrenceList({ title, data }: Props) {
  return (
    <View className="mb-6">
      <Text className="text-lg font-bold text-gray-800 mb-2">{title}</Text>
      {data.map((occurrence) => (
        <OccurrenceCardOrganism key={occurrence.id} occurrence={occurrence} />
      ))}
    </View>
  )
}
