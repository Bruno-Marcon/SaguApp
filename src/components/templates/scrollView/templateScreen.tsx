import { View, ScrollView, SafeAreaView } from 'react-native';
import BottomTabBar from '../../organisms/tabBar/BottomTabBar';
import DefaultNavBar from '../../organisms/navbar/defaultNav';

export default function TemplateScreen({ children }: { children: React.ReactNode }) {
  return (
    <View className="flex-1 bg-gray-100">
      <SafeAreaView className="bg-gray-100">
        <DefaultNavBar />
      </SafeAreaView>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
      <BottomTabBar />
    </View>
  );
}
