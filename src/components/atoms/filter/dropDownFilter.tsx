import React from 'react';
import { View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Feather } from '@expo/vector-icons';

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
    <View className="w-full">
      <Text className="text-sm font-medium text-gray-700 mb-2">{label}</Text>

      <RNPickerSelect
        onValueChange={onChange}
        value={value}
        items={options}
        useNativeAndroidPickerStyle={false}
        placeholder={{ label: `Selecione ${label.toLowerCase()}`, value: '' }}
        Icon={() => (
          <Feather name="chevron-down" size={20} color="#6B7280" style={{ marginRight: 12 }} />
        )}
        style={{
          inputAndroid: {
            borderWidth: 1,
            borderColor: '#D1D5DB',
            paddingVertical: 12,
            paddingHorizontal: 14,
            borderRadius: 12,
            color: '#111827',
            backgroundColor: '#F9FAFB',
            fontSize: 16,
          },
          inputIOS: {
            borderWidth: 1,
            borderColor: '#D1D5DB',
            paddingVertical: 12,
            paddingHorizontal: 14,
            borderRadius: 12,
            color: '#111827',
            backgroundColor: '#F9FAFB',
            fontSize: 16,
          },
          iconContainer: {
            top: 14,
            right: 10,
          },
          placeholder: {
            color: '#9CA3AF',
          },
        }}
      />
    </View>
  );
}
