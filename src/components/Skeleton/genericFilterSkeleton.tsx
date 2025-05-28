import { View } from 'react-native';
import React from 'react';

export default function GenericFiltersSkeleton() {
  return (
    <View className="px-4 pt-2">
      {/* Date Range */}
      <View className="mb-4">
        <View className="h-4 w-20 bg-neutral-200 dark:bg-neutral-700 rounded-md mb-2" />
        <View className="flex-row gap-x-2">
          <View className="flex-1 h-10 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
          <View className="flex-1 h-10 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
        </View>
      </View>

      {/* Status */}
      <View className="mb-4">
        <View className="h-4 w-20 bg-neutral-200 dark:bg-neutral-700 rounded-md mb-2" />
        <View className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
      </View>

      {/* Severity */}
      <View className="mb-4">
        <View className="h-4 w-24 bg-neutral-200 dark:bg-neutral-700 rounded-md mb-2" />
        <View className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
      </View>

      {/* Student */}
      <View className="mb-4">
        <View className="h-4 w-24 bg-neutral-200 dark:bg-neutral-700 rounded-md mb-2" />
        <View className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
      </View>
    </View>
  );
}
