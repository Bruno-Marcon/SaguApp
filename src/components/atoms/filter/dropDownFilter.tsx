import { View, Text, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { Feather } from '@expo/vector-icons'

type Option = {
  label: string
  value: string
}

type Props = {
  label: string
  options: Option[]
  selected: string
  onSelect: (value: string) => void
}

export default function DropdownFilter({ label, options, selected, onSelect }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <View className="mb-4 z-10">
      <Text className="text-sm text-gray-600 mb-1">{label}</Text>
      
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        className="bg-white border border-gray-300 rounded-lg p-3 flex-row justify-between items-center"
      >
        <Text className="text-gray-800">{selected}</Text>
        <Feather name={open ? 'chevron-up' : 'chevron-down'} size={20} color="#6B7280" />
      </TouchableOpacity>

      {open && (
        <View className="max-h-48 bg-white border border-gray-300 rounded-lg mt-1 overflow-scroll">
          {options.map((item) => (
            <TouchableOpacity
              key={item.value}
              onPress={() => {
                onSelect(item.value)
                setOpen(false)
              }}
              className="p-3 border-b border-gray-100"
            >
              <Text className="text-gray-700">{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}
