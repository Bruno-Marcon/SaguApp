import { View } from 'react-native';
import React from 'react';

export const SectionAcademicDataSkeleton = () => {
  return (
    <View className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl px-6 py-5 mb-4 mt-6">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <View className="w-36 h-5 bg-neutral-200 dark:bg-neutral-700 rounded-md" />

        <View className="flex-row items-center">
          <View className="w-20 h-4 bg-neutral-200 dark:bg-neutral-700 rounded-md mr-2" />
          <View className="w-4 h-4 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
        </View>
      </View>

      {/* Cards */}
      <View className="flex-row justify-between">
        {[...Array(3)].map((_, index) => (
          <View
            key={`academic-card-skeleton-${index}`}
            className="flex-1 items-center mx-1 bg-gray-50 dark:bg-neutral-800 rounded-xl p-4"
          >
            {/* Ícone */}
            <View className="p-2 rounded-full mb-2 bg-neutral-200 dark:bg-neutral-700" />

            {/* Title */}
            <View className="w-16 h-3 bg-neutral-200 dark:bg-neutral-700 rounded-md mb-2" />

            {/* Value */}
            <View className="w-10 h-4 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
          </View>
        ))}
      </View>
    </View>
  );
};
