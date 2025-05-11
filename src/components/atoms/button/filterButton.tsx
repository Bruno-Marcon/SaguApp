import { TouchableOpacity, Text } from 'react-native'

interface FilterButtonProps {
  label: string
  active: boolean
  onPress: () => void
}

export default function FilterButton({ label, active, onPress }: FilterButtonProps) {
  return (
    <TouchableOpacity
      className={`py-2 px-4 rounded-lg ${active ? 'bg-green-500' : 'bg-gray-200'}`}
      onPress={onPress}
    >
      <Text className={`font-medium ${active ? 'text-white' : 'text-gray-700'}`}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}