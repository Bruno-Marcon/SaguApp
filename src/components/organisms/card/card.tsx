import React from 'react';
import { View, Text } from 'react-native';

interface StatusCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  containerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  icon,
  title,
  subtitle,
  containerClassName,
  titleClassName,
  subtitleClassName,
}) => {
  return (
    <View
      className={`bg-white dark:bg-neutral-800
        w-[100px] h-[100px] justify-between rounded-2xl px-3 py-2 
        shadow-sm shadow-black/5 border border-gray-100 dark:border-neutral-600
        ${containerClassName || ''}`}
    >
      <View className="items-center">{icon}</View>

      <Text
        className={`text-[12px] text-center text-gray-700 dark:text-gray-300 
          font-medium mt-1 ${titleClassName || ''}`}
        numberOfLines={1}
      >
        {title}
      </Text>

      <Text
        className={`text-[20px] font-bold text-center text-gray-900 dark:text-white 
          ${subtitleClassName || ''}`}
        accessibilityLabel={`Total: ${subtitle}`}
      >
        {subtitle}
      </Text>
    </View>
  );
};

export default StatusCard;
