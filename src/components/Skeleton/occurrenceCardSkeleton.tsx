import { View } from 'react-native';

export default function OccurrenceCardSkeleton() {
  return (
    <View
      className="bg-white dark:bg-neutral-900 rounded-3xl shadow-xl 
      border border-gray-100 dark:border-neutral-700 overflow-hidden mb-4"
    >
      {/* Linha lateral */}
      <View
        className="w-[5px] rounded-tl-3xl rounded-bl-3xl absolute left-0 top-0 bottom-0"
        style={{ backgroundColor: '#F59E0B' }}
      />

      <View className="p-4 pl-6 flex-row items-start">
        {/* Ícone */}
        <View className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 mr-4 mt-1" />

        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-2">
            <View className="h-4 w-1/2 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
            <View className="h-4 w-12 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
          </View>

          {/* Kind e Severity */}
          <View className="flex-row gap-x-2 mb-2">
            <View className="h-3 w-16 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
            <View className="h-3 w-16 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
          </View>

          {/* Description */}
          <View className="h-3 w-full bg-neutral-200 dark:bg-neutral-700 rounded-md mb-2" />
          <View className="h-3 w-5/6 bg-neutral-200 dark:bg-neutral-700 rounded-md mb-2" />
          <View className="h-3 w-2/3 bg-neutral-200 dark:bg-neutral-700 rounded-md mb-4" />

          {/* Meta (Data) */}
          <View className="h-3 w-24 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
        </View>
      </View>
    </View>
  );
}
