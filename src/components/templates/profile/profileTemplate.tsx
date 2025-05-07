import { View } from 'react-native';
import { Link } from 'expo-router';
import { ProfileHeader } from '../../molecules/header/profileHeader';
import { ProfileMenu } from '../../organisms/menu/profileMenu';
import { Button } from '../../atoms/button/button';


type ProfileTemplateProps = {
  name: string;
  email: string;
};

export const ProfileTemplate = ({ name, email }: ProfileTemplateProps) => {
  return (
    <View className="flex-1 bg-gray-50 p-6">
      <ProfileHeader name={name} email={email} />
      <ProfileMenu />
      
      <Link href="/" asChild>
        <Button 
          title="Back to Main Page" 
          variant="primary" 
          size="lg" 
          className="mt-8 justify-center" 
        />
      </Link>
    </View>
  );
};