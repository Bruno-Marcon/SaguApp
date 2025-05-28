import React from 'react';
import { View } from 'react-native';

interface StatusCardSkeletonProps {
  containerClassName?: string;
}

const StatusCardSkeleton: React.FC<StatusCardSkeletonProps> = ({
  containerClassName,
}) => {
  return (
    <View
      className={`bg-white dark:bg-neutral-800
        w-[100px] h-[100px] justify-between rounded-2xl px-3 py-2 
        shadow-sm shadow-black/5 border border-gray-100 dark:border-neutral-600
        ${containerClassName || ''}`}
    >
      {/* Ícone Placeholder */}
      <View className="items-center">
        <View className="w-5 h-5 bg-neutral-200 dark:bg-neutral-600 rounded-full" />
      </View>

      {/* Título Placeholder */}
      <View className="mt-1 self-center">
        <View className="w-16 h-3 bg-neutral-200 dark:bg-neutral-600 rounded-md" />
      </View>

      {/* Subtitle Placeholder */}
      <View className="self-center">
        <View className="w-10 h-5 bg-neutral-200 dark:bg-neutral-600 rounded-md" />
      </View>
    </View>
  );
};

export default StatusCardSkeleton;
