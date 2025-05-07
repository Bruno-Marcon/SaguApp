import React from 'react';
import { useRouter } from 'expo-router';
import { Logout } from '@//services/auth/authService';
import ProfileContent from '@//components/molecules/profile/ProfileContent';


const Profile = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await Logout();
    router.replace('/(auth)/signin/page');
  };

  return (
    <ProfileContent
      name="João Silva"
      email="joao.silva@email.com"
      onLogout={handleLogout}
    />
  );
};

export default Profile;
