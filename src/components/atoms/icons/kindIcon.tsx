import { View } from 'react-native'
import { Feather } from '@expo/vector-icons'

type Props = {
  kind?: string
  color: string
}

export default function KindIcon({ kind, color }: Props) {
  const kindMap: Record<string, keyof typeof Feather.glyphMap> = {
    disciplina: 'alert-triangle',
    academica: 'book-open',
    frequencia: 'clock',
    default: 'file-text',
  }

  const normalizedKind = (kind || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  const iconName = kindMap[normalizedKind] || kindMap.default

  return (
    <View className="bg-gray-100 p-2 rounded-xl">
      <Feather name={iconName} size={22} color={color} />
    </View>
  )
}
