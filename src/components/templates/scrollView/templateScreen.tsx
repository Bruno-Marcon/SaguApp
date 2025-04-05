import { View, ScrollView } from 'react-native';

export default function TemplateScreen({ children }: { children: React.ReactNode }) {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="flex-1 px-4 pt-12">
        {children}
      </View>
    </ScrollView>
  );
}
