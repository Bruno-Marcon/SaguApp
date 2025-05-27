import { View } from 'react-native';
import { MenuItem } from '../../molecules/menu/menuItem';
import { useRouter } from 'expo-router';

export const ProfileMenu = () => {
  const router = useRouter();

  return (
    <View className="gap-y-4">
      <MenuItem
        iconName="settings-outline"
        iconFamily="ionicons"
        title="Configurações da Conta"
        onPress={() => router.push('/(panel)/settings/page')}
      />

      <MenuItem
        iconName="user"
        iconFamily="feather"
        title="Informações de Perfil"
        onPress={() => router.push('/(panel)/profile/profile')}
      />

      <MenuItem
        iconName="notifications-outline"
        iconFamily="ionicons"
        title="Notificações"
        onPress={() => router.push('/')}
      />
    </View>
  );
};
