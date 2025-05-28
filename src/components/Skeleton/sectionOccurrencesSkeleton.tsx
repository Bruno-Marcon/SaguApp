import { View, Text, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import React from 'react';

export const SectionOccurrencesSkeleton = () => {
  const skeletonItems = Array.from({ length: 2 });

  return (
    <View className="mt-6 px-4 z-0 overflow-visible">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center gap-x-2">
          <Feather name="alert-circle" size={20} color="#F87171" />
          <View className="h-5 w-36 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
        </View>

        <View className="flex-row items-center bg-green-50 dark:bg-neutral-800 px-3 py-1 rounded-full">
          <View className="h-4 w-20 bg-neutral-200 dark:bg-neutral-700 rounded-md mr-2" />
          <View className="w-4 h-4 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
        </View>
      </View>

      {/* Cards */}
      <FlatList
        data={skeletonItems}
        keyExtractor={(_, index) => `occurrence-skeleton-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 16,
          paddingBottom: 8,
          paddingTop: 2,
        }}
        renderItem={() => (
          <View className="w-[260px] h-[120px] bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
        )}
      />
    </View>
  );
};
