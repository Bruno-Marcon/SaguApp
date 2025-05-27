import React from 'react';
import { View, useWindowDimensions, Platform } from 'react-native';
import { usePathname } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { TabItem } from '../../molecules/tab/tabItens';

type Route =
  | '/(panel)/home/page'
  | '/(panel)/schedules/page'
  | '/(panel)/authorization/page'
  | '/(panel)/occurences/occurences'
  | '/(panel)/settings/page';

const tabs: { label: string; icon: keyof typeof Feather.glyphMap; route: Route }[] = [
  { label: 'Calendário', icon: 'calendar', route: '/(panel)/schedules/page' },
  { label: 'Autorizações', icon: 'file-text', route: '/(panel)/authorization/page' },
  { label: 'Home', icon: 'home', route: '/(panel)/home/page' },
  { label: 'Ocorrências', icon: 'clock', route: '/(panel)/occurences/occurences' },
  { label: 'Perfil', icon: 'user', route: '/(panel)/settings/page' },
];

export default function BottomTabBar() {
  const pathname = usePathname();
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;
  const isWeb = Platform.OS === 'web';

  const containerStyle = isTablet
    ? 'flex-col h-full w-24 justify-start py-16 px-3 border-r border-gray-100 dark:border-neutral-800'
    : 'flex-row justify-around px-8 py-6 rounded-t-2xl mb-4 border-t border-gray-100 dark:border-neutral-800';

  return (
    <View
      className={`
        ${containerStyle}
        items-center
        bg-white dark:bg-neutral-900
        shadow-md shadow-black/10
      `}
    >
      {tabs.map((tab) => {
        const normalizeRoute = (route: string) => route.replace(/^\/\(panel\)/, '');
        const tabRouteNormalized = normalizeRoute(tab.route);
        const active =
          pathname === tabRouteNormalized || pathname.startsWith(`${tabRouteNormalized}/`);

        return (
          <View
            key={tab.label}
            className={`${isTablet ? 'mb-12' : 'mb-4'}`}
          >
            <TabItem
              icon={tab.icon}
              label={!isTablet ? tab.label : ''}
              route={tab.route}
              active={active}
              iconSize={isTablet ? 32 : 28}
            />
          </View>
        );
      })}

    </View>
  );
}
