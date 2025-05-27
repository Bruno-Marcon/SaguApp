import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';

type Props = {
  label: string;
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
};

export default function DateRangePickerFilter({
  label,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: Props) {
  const [pickerVisible, setPickerVisible] = useState<'start' | 'end' | null>(null);

  const handleConfirm = (date: Date) => {
    if (pickerVisible === 'start') {
      onStartDateChange(date);
    } else if (pickerVisible === 'end') {
      onEndDateChange(date);
    }
    setPickerVisible(null);
  };

  return (
    <View className="mb-4">
      <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</Text>

      <View className="flex-row gap-x-2">
        <TouchableOpacity
          onPress={() => setPickerVisible('start')}
          className="flex-1 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-lg p-3 flex-row items-center justify-between"
        >
          <Text className="text-gray-800 dark:text-white">
            {startDate ? moment(startDate).format('DD/MM/YYYY') : 'Início'}
          </Text>
          <Feather name="calendar" size={18} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setPickerVisible('end')}
          className="flex-1 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-lg p-3 flex-row items-center justify-between"
        >
          <Text className="text-gray-800 dark:text-white">
            {endDate ? moment(endDate).format('DD/MM/YYYY') : 'Fim'}
          </Text>
          <Feather name="calendar" size={18} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={pickerVisible !== null}
        mode="date"
        display={Platform.OS === 'ios' ? 'inline' : 'default'}
        onConfirm={handleConfirm}
        onCancel={() => setPickerVisible(null)}
        maximumDate={new Date()}
      />
    </View>
  );
}
