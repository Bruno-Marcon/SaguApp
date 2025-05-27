import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import BottomTabBar from '../../organisms/tabBar/BottomTabBar';
import DefaultNavBar from '../../organisms/navbar/defaultNav';
import HelpWidget from '../../organisms/widget/helpWidgetOrganism';

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
  return (
    <View className="flex-1 bg-gray-100 dark:bg-neutral-950">
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
      {/* <HelpWidget /> */}
    </View>
  );
}
