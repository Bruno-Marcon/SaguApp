import { View, Text, Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useThemeApp } from '../../organisms/list/themeContext';

export default function ToggleThemeButton() {
  const { theme, toggleTheme } = useThemeApp();
  const isDark = theme === 'dark';

  return (
    <View className="flex-row justify-between items-center mt-3">
      <View className="flex-row items-center">
        <Feather name="moon" size={20} color={isDark ? '#FCD34D' : '#3B82F6'} />
        <Text className="ml-3 text-gray-800 dark:text-gray-100 font-medium text-base">
          Tema Escuro
        </Text>
      </View>

      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        trackColor={{ false: '#d1d5db', true: '#4B5563' }}
        thumbColor={isDark ? '#FCD34D' : '#3B82F6'}
      />
    </View>
  );
}
