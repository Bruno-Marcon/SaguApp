import { View, Text } from 'react-native'
import SeverityBadge from '../../atoms/badge/severityBadge'
import StatusBadge from '../../atoms/badge/statusBadge'

type Props = {
  title: string
  status?: string
  severity?: string
}

export default function OccurrenceCardHeader({ title, status, severity }: Props) {
  return (
    <View className="flex-row justify-between items-start mb-1">
      <Text className="text-base font-bold text-gray-900 flex-1" numberOfLines={1}>
        {title}
      </Text>

      <View className="flex flex-col items-end gap-y-1 ml-2">
        {status && <StatusBadge status={status} />}
        {severity && <SeverityBadge severity={severity} />}
      </View>
    </View>
  )
}
