import { View } from 'react-native';

export default function AuthorizationCardSkeleton() {
  return (
    <View className="bg-white dark:bg-neutral-900 rounded-3xl shadow-xl border border-gray-100 dark:border-neutral-700 overflow-hidden mb-4">
      <View
        className="w-[5px] rounded-tl-3xl rounded-bl-3xl absolute left-0 top-0 bottom-0"
        style={{ backgroundColor: '#3B82F6' }}
      />

      <View className="p-4 pl-6 flex-row items-start gap-x-3">
        <View className="mt-1 w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-700" />

        <View className="flex-1">
          <View className="flex-row mb-2">
            <View className="h-4 w-20 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
          </View>

          <View className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded-md mb-2 w-3/4" />

          <View className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded-md w-full mb-1" />
          <View className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded-md w-5/6" />

          <View className="flex-row items-center mt-3">
            <View className="h-3 w-3 rounded-full bg-neutral-200 dark:bg-neutral-700" />
            <View className="h-3 w-24 rounded-md bg-neutral-200 dark:bg-neutral-700 ml-2" />
          </View>
        </View>
      </View>
    </View>
  );
}
