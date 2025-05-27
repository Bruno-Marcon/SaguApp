import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  active: boolean;
  iconSize?: number;
};

export const IconLabel = ({ icon, label, active,iconSize = 24}: Props) => {
  const activeColor = '#16A34A'; // verde ativo
  const inactiveColor = '#64748b'; // cinza

  return (
    <View className="items-center">
      <Feather
        name={icon}
        color={active ? activeColor : inactiveColor}
        size={iconSize}
      />
      <Text
        className={`text-xs mt-1 ${
          active
            ? 'text-green-600'
            : 'text-slate-500 dark:text-slate-400'
        }`}
      >
        {label}
      </Text>
    </View>
  );
};
