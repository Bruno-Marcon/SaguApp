import React, { useState, useCallback } from 'react';
import { View, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import BottomTabBar from '../../organisms/tabBar/BottomTabBar';
import DefaultNavBar from '../../organisms/navbar/defaultNav';

export default function TemplateScreen({ children }: { children: React.ReactNode }) {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshKey(prev => prev + 1); // muda a key -> força recriação dos filhos
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <View className="flex-1 bg-gray-100">
      <SafeAreaView className="bg-gray-100">
        <DefaultNavBar />
      </SafeAreaView>
      <ScrollView
        key={refreshKey} // <- força o re-render
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {children}
      </ScrollView>
      <BottomTabBar />
    </View>
  );
}
