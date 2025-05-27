import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';
import TemplateScreen from '../../../components/templates/scrollView/templateScreen';
import { ProfileHeader } from '../../molecules/header/profileHeader';
import { Logout } from '@//services/auth/authService';
import ToggleThemeButton from '../../atoms/button/toggleThemeButton';

const handleLogout = async () => {
  await Logout();
  router.replace('/(auth)/signin/page');
};

type SettingsTemplateProps = {
  name: string;
  email: string;
  showBackButton?: boolean;
};

export const SettingsTemplate = ({
  name,
  email,
  showBackButton = true,
}: SettingsTemplateProps) => {
  const router = useRouter();

  return (
    <TemplateScreen withHeader={false} withBottomBar={false}>
      <ScrollView className="flex-1 px-5 py-8 mt-6">
        <View className="mt-2">
          <ProfileHeader name={name} email={email} showBackButton={showBackButton} />
        </View>

        <View className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl p-4 mb-5">
          <Text className="text-gray-500 dark:text-gray-400 text-xs mb-3">
            Aparência
          </Text>
          <ToggleThemeButton />
        </View>

        <View className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl p-4 mb-5">
          <Text className="text-gray-500 dark:text-gray-400 text-xs mb-3">
            Conta
          </Text>

          <TouchableOpacity
            className="flex-row justify-between items-center py-3"
            onPress={() => router.push('/(panel)/profile/profile')}
          >
            <View className="flex-row items-center">
              <Feather name="user" size={18} color="#3B82F6" />
              <Text className="ml-3 text-gray-800 dark:text-gray-100 font-medium">
                Informações de Perfil
              </Text>
            </View>
            <Feather name="chevron-right" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row justify-between items-center py-3">
            <View className="flex-row items-center">
              <Feather name="lock" size={18} color="#10B981" />
              <Text className="ml-3 text-gray-800 dark:text-gray-100 font-medium">
                Privacidade e Segurança
              </Text>
            </View>
            <Feather name="chevron-right" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl p-4 mb-5">
          <Text className="text-gray-500 dark:text-gray-400 text-xs mb-3">
            Notificações
          </Text>

          <TouchableOpacity className="flex-row justify-between items-center py-3">
            <View className="flex-row items-center">
              <Feather name="bell" size={18} color="#F59E0B" />
              <Text className="ml-3 text-gray-800 dark:text-gray-100 font-medium">
                Gerenciar Notificações
              </Text>
            </View>
            <Feather name="chevron-right" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl p-4">
          <Text className="text-gray-500 dark:text-gray-400 text-xs mb-3">
            Sobre
          </Text>

          <TouchableOpacity className="flex-row justify-between items-center py-3">
            <View className="flex-row items-center">
              <Feather name="info" size={18} color="#6366F1" />
              <Text className="ml-3 text-gray-800 dark:text-gray-100 font-medium">
                Sobre o App
              </Text>
            </View>
            <Feather name="chevron-right" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row justify-between items-center py-3">
            <View className="flex-row items-center">
              <Feather name="file-text" size={18} color="#10B981" />
              <Text className="ml-3 text-gray-800 dark:text-gray-100 font-medium">
                Termos e Políticas
              </Text>
            </View>
            <Feather name="chevron-right" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TemplateScreen>
  );
};
