import React from 'react';
import { View, SafeAreaView, ScrollView, useWindowDimensions } from 'react-native';
import BottomTabBar from '../../organisms/tabBar/BottomTabBar';
import DefaultNavBar from '../../organisms/navbar/defaultNav';

type TemplateScreenProps = {
  children: React.ReactNode;
  withSafeArea?: boolean;
  withHeader?: boolean;
  withBottomBar?: boolean;
  scrollable?: boolean;
};

export default function TemplateScreen({
  children,
  withSafeArea = true,
  withHeader = true,
  withBottomBar = true,
  scrollable = true,
}: TemplateScreenProps) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <View className={`flex-1 bg-gray-100 dark:bg-neutral-950 ${isTablet ? 'pl-24' : ''}`}>
      {withSafeArea && withHeader && (
        <SafeAreaView className="bg-gray-100 dark:bg-neutral-950">
          <DefaultNavBar />
        </SafeAreaView>
      )}

      <View className="flex-1">
        {scrollable ? (
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View className="flex-1">{children}</View>
        )}
      </View>

      {withBottomBar && <BottomTabBar />}
    </View>
  );
}
