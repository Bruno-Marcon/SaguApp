import { View } from 'react-native';
import React from 'react';

interface ApresentationSectionSkeletonProps {
  containerClassName?: string;
  backgroundClassName?: string;
}

export const ApresentationSectionSkeleton = ({
  containerClassName = 'px-5 pt-6 pb-4',
  backgroundClassName = 'bg-emerald-700 dark:bg-emerald-800',
}: ApresentationSectionSkeletonProps) => {
  return (
    <View
      className={`${containerClassName} ${backgroundClassName} rounded-b-3xl`}
    >
      {/* Título */}
      <View className="h-6 w-2/3 bg-emerald-600 dark:bg-emerald-700 rounded-md" />
      <View className="h-4 w-1/3 bg-emerald-600 dark:bg-emerald-700 rounded-md mt-2" />

      {/* Cards */}
      <View className="flex-row justify-between gap-x-3 mt-5">
        {[...Array(3)].map((_, index) => (
          <View
            key={`status-card-skeleton-${index}`}
            className="flex-1 p-3 bg-emerald-600 dark:bg-emerald-700 rounded-2xl"
          >
            {/* Ícone */}
            <View className="h-5 w-5 bg-emerald-500 dark:bg-emerald-800 rounded-full" />

            {/* Título */}
            <View className="h-4 w-4/5 bg-emerald-500 dark:bg-emerald-800 rounded-md mt-3" />

            {/* Subtitle */}
            <View className="h-3 w-3/5 bg-emerald-500 dark:bg-emerald-800 rounded-md mt-2" />
          </View>
        ))}
      </View>
    </View>
  );
};
