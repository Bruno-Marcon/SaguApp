import { ScrollView, View } from 'react-native';

export const CustomCalendarSkeleton = () => {
  return (
    <ScrollView
      className="flex-1 bg-white dark:bg-neutral-950 rounded-2xl px-4 pt-4"
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <View className="h-6 w-36 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
        <View className="flex-row space-x-3">
          <View className="h-9 w-9 rounded-full bg-neutral-200 dark:bg-neutral-700" />
          <View className="h-9 w-9 rounded-full bg-neutral-200 dark:bg-neutral-700" />
        </View>
      </View>

      {/* Calendário */}
      <View className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl px-4 py-6 mb-4">
        <View className="h-4 w-40 bg-neutral-300 dark:bg-neutral-600 rounded-md mb-4" />
        <View className="flex flex-wrap flex-row justify-between gap-2">
          {Array.from({ length: 28 }).map((_, index) => (
            <View
              key={index}
              className="h-8 w-8 bg-neutral-200 dark:bg-neutral-700 rounded-full"
            />
          ))}
        </View>
      </View>

      {/* Legenda */}
      <View className="flex-row items-center space-x-2 mb-3">
        <View className="w-2 h-2 bg-green-700 rounded-full" />
        <View className="h-3 w-24 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
      </View>

      {/* Botão ver todos */}
      <View className="self-end mb-3">
        <View className="h-4 w-48 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
      </View>

      {/* Lista de eventos */}
      {Array.from({ length: 3 }).map((_, index) => (
        <View
          key={index}
          className="bg-white dark:bg-neutral-900 rounded-2xl p-4 mb-4 border border-neutral-200 dark:border-neutral-700"
        >
          <View className="h-4 w-32 bg-neutral-200 dark:bg-neutral-700 rounded-md mb-2" />
          <View className="h-5 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded-md mb-2" />
          <View className="h-4 w-full bg-neutral-200 dark:bg-neutral-700 rounded-md mb-1" />
          <View className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-700 rounded-md mb-1" />
          <View className="flex-row items-center mt-2">
            <View className="h-3 w-3 rounded-full bg-neutral-200 dark:bg-neutral-700" />
            <View className="h-3 w-24 rounded-md bg-neutral-200 dark:bg-neutral-700 ml-2" />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};
