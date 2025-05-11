import React from 'react'
import { View, Text } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'

type DropdownFilterProps = {
  label: string
  value: string
  options: string[]
  onChange: (newValue: string) => void
}

export default function DropdownFilter({ label, value, options, onChange }: DropdownFilterProps) {
  return (
    <View style={{ marginBottom: 12, width: '100%' }}>
      <Text className="text-xs text-gray-500">{label}</Text>
      
      <RNPickerSelect
        onValueChange={onChange}  // Atualiza o valor selecionado
        value={value}
        items={options.map(option => ({
          label: option,
          value: option,
        }))}
        style={{
          inputAndroid: {
            borderWidth: 1,
            borderColor: '#ddd',
            padding: 10,
            borderRadius: 8,
            color: '#000',
            width: '100%',
          },
          inputIOS: {
            borderWidth: 1,
            borderColor: '#ddd',
            padding: 10,
            borderRadius: 8,
            color: '#000',
            width: '100%',
          },
        }}
      />
    </View>
  )
}
