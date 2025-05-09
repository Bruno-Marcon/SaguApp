// components/templates/profile/profileTemplate.tsx
import { View } from 'react-native';
import { Link, router } from 'expo-router';
import { ProfileHeader } from '../../molecules/header/profileHeader';
import { ProfileMenu } from '../../organisms/menu/profileMenu';
import { Button } from '../../atoms/button/button';
import { Logout } from '@//services/auth/authService';
import TemplateScreen from '../scrollView/templateScreen';

const handleLogout = async () => {
  await Logout();
  router.replace('/(auth)/signin/page');
};

type ProfileTemplateProps = {
  name: string;
  email: string;
  showBackButton?: boolean;
};

export const ProfileTemplate = ({ 
  name, 
  email,
  showBackButton = true 
}: ProfileTemplateProps) => {
  return (
    <TemplateScreen withHeader={false} withBottomBar={false}>
      <View className="flex-1 px-4 pt-8">
        <View className="mt-4">
          <ProfileHeader 
            name={name} 
            email={email} 
            showBackButton={showBackButton}
          />
        </View>
        
        <View className="mt-6">
          <ProfileMenu />
        </View>
        
        <View className="mt-auto mb-6">
          <Button 
            title="Sair"
            variant="primary" 
            size="lg"
            className="w-full"
            onPress={handleLogout}
          />
        </View>
      </View>
    </TemplateScreen>
  );
};