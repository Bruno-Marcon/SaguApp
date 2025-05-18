import { View, Text } from 'react-native'

type Props = {
  severity?: string
}

export default function SeverityBadge({ severity }: Props) {
  const normalized = severity?.toLowerCase() || ''

  const getColor = () => {
    switch (normalized) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getLabel = () => {
    switch (normalized) {
      case 'high':
        return 'Alta'
      case 'medium':
        return 'Média'
      case 'low':
        return 'Baixa'
      default:
        return 'Indefinida'
    }
  }

  return (
    <View className={`px-3 py-1 rounded-full shadow-sm ${getColor()}`}>
      <Text className="text-[10px] font-bold uppercase tracking-wide">
        {getLabel()}
      </Text>
    </View>
  )
}
