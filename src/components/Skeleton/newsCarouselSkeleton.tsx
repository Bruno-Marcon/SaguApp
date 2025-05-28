import { View } from 'react-native';
import React from 'react';

export const NewsCarouselSkeleton = () => {
  return (
    <View className="px-4 py-4">
      {/* Header */}
      <View className="flex-row items-center gap-x-2 mb-3">
        <View className="w-4 h-4 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
        <View className="h-5 w-32 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
      </View>

      {/* Lista de cards skeleton */}
      {[...Array(2)].map((_, index) => (
        <View
          key={`news-skeleton-${index}`}
          className="bg-white dark:bg-neutral-900 
          mb-4 rounded-2xl p-5 mx-2 
          border border-gray-100 dark:border-neutral-700"
        >
          {/* Header do card */}
          <View className="flex-row items-center gap-x-2 mb-2">
            <View className="w-5 h-5 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
            <View className="h-4 w-44 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
          </View>

          {/* Content */}
          <View className="h-3 w-full bg-neutral-200 dark:bg-neutral-700 rounded-md mb-2" />
          <View className="h-3 w-[90%] bg-neutral-200 dark:bg-neutral-700 rounded-md mb-2" />
          <View className="h-3 w-[80%] bg-neutral-200 dark:bg-neutral-700 rounded-md mb-3" />

          {/* Footer */}
          <View className="flex-row items-center">
            <View className="w-3 h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
            <View className="h-3 w-24 ml-2 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
          </View>
        </View>
      ))}
    </View>
  );
};
