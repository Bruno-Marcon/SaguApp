import React from 'react';
import { View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

type Option = {
  label: string;
  value: string;
};

type DropdownFilterProps = {
  label: string;
  value: string;
  options: Option[];
  onChange: (newValue: string) => void;
};

export default function DropdownFilter({
  label,
  value,
  options,
  onChange,
}: DropdownFilterProps) {
  return (
    <View className="mb-3 w-full">
      <Text className="text-xs text-gray-500 mb-1">{label}</Text>

      <RNPickerSelect
        onValueChange={onChange}
        value={value}
        items={options}
        useNativeAndroidPickerStyle={false}
        placeholder={{ label: `Selecione ${label.toLowerCase()}`, value: '' }}
        style={{
          inputAndroid: {
            borderWidth: 1,
            borderColor: '#D1D5DB',
            padding: 10,
            borderRadius: 8,
            color: '#111827',
            backgroundColor: '#fff',
          },
          inputIOS: {
            borderWidth: 1,
            borderColor: '#D1D5DB',
            padding: 10,
            borderRadius: 8,
            color: '#111827',
            backgroundColor: '#fff',
          },
        }}
      />
    </View>
  );
}
