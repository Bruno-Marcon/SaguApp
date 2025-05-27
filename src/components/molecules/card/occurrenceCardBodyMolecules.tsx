import { Text } from 'react-native'

type Props = {
  description: string
}

export default function OccurrenceCardBody({ description }: Props) {
  return (
    <Text className="text-sm text-gray-600 dark:text-gray-300 mt-0.5 leading-snug" numberOfLines={2}>
      {description}
    </Text>
  )
}
