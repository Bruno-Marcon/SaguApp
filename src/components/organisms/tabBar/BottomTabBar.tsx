// Atualizado: BottomTabBar.tsx com microinterações, acessibilidade e reforço de navegação
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { FeatherIconName } from '../../atoms/card/cardAuthorizationAtom';

const tabs = [
  { label: 'Calendário', icon: 'calendar', route: '/(panel)/schedules/page' },
  { label: 'Autorizações', icon: 'file-text', route: '/(panel)/authorization/page' },
  { label: 'Ocorrências', icon: 'clock', route: '/(panel)/occurences/occurences' },
  { label: 'Perfil', icon: 'user', route: '/(panel)/profile/profile' },
];

export default function BottomTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const handleOptionPress = (option: string) => {
    setIsOptionsVisible(false);
    switch (option) {
      case 'checkin':
        console.log('Check In');
        break;
      case 'review':
        console.log('Review');
        break;
      case 'photo':
        console.log('Add Photo');
        break;
    }
  };

  return (
    <View className="flex-row justify-around items-center bg-white rounded-t-3xl p-6 shadow-md shadow-black/10 relative">
      {tabs.slice(0, 2).map((tab) => (
        <TabItem
          key={tab.label}
          icon={tab.icon}
          label={tab.label}
          route={tab.route}
          active={pathname.startsWith(tab.route)}
        />
      ))}

      <View className="relative -mt-10">
        <TouchableOpacity
          onPress={() => setIsOptionsVisible(!isOptionsVisible)}
          className="bg-green-500 p-4 rounded-full shadow-xl shadow-green-400 z-10 transform -translate-x-[14px]"
          accessibilityRole="button"
          accessibilityLabel="Menu de opções"
        >
          <Feather name={isOptionsVisible ? 'x' : 'plus'} color="white" size={24} />
        </TouchableOpacity>

        {isOptionsVisible && (
          <View className="absolute bottom-full left-1/2 transform -translate-x-1/2 flex-row items-center mb-8 gap-x-3">
            <OptionButton icon="check-circle" onPress={() => handleOptionPress('checkin')} />
            <OptionButton icon="edit-2" onPress={() => handleOptionPress('review')} />
            <OptionButton icon="camera" onPress={() => handleOptionPress('photo')} />
          </View>
        )}
      </View>

      {tabs.slice(2).map((tab) => (
        <TabItem
          key={tab.label}
          icon={tab.icon}
          label={tab.label}
          route={tab.route}
          active={pathname.startsWith(tab.route)}
        />
      ))}
    </View>
  );
}

function TabItem({ icon, label, route, active }: { icon: any; label: string; route: string; active: boolean }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(route)}
      className="items-center justify-center"
      accessibilityRole="tab"
      accessibilityLabel={`${label}${active ? ' selecionado' : ''}`}
    >
      <Feather
        name={icon}
        size={24}
        color={active ? '#16A34A' : '#9CA3AF'}
        style={{ marginBottom: 4 }}
      />
      <Text className={`text-xs ${active ? 'text-green-600 font-semibold' : 'text-gray-400'}`}>{label}</Text>
      {active && <View className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1" />}
    </TouchableOpacity>
  );
}

function OptionButton({ icon, onPress }: { icon: FeatherIconName; onPress: () => void }) {
  return (
    <TouchableOpacity
      className="bg-green-500 p-5 rounded-full shadow-md shadow-green-300"
      onPress={onPress}
      accessibilityRole="button"
    >
      <Feather name={icon} size={20} color="white" />
    </TouchableOpacity>
  );
}