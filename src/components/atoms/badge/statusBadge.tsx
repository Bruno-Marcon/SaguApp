import { Text, View } from 'react-native'

type StatusBadgeProps = {
  status?: string
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status?.toLowerCase() || ''

  const getColor = () => {
    switch (normalized) {
      case 'open':
      case 'aberta':
        return 'bg-red-100 text-red-800'
      case 'in_progress':
      case 'em andamento':
        return 'bg-yellow-100 text-yellow-800'
      case 'resolved':
      case 'resolvida':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getLabel = () => {
    switch (normalized) {
      case 'open':
      case 'aberta':
        return 'Aberta'
      case 'in_progress':
      case 'em andamento':
        return 'Em andamento'
      case 'resolved':
      case 'resolvida':
        return 'Resolvida'
      default:
        return 'Indefinido'
    }
  }

  return (
    <View className={`px-3 py-1 rounded-full ${getColor()}`}>
      <Text className="text-xs font-semibold uppercase tracking-wide">
        {getLabel()}
      </Text>
    </View>
  )
}
