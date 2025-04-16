import React, { useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { Avatar } from '../../atoms/avatar/avatar';
import LogoutModal from '../../molecules/modal/logout';
import { logout } from '@//services/auth/authService';

const ProfileAvatar: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    await logout();
    setModalVisible(false);
    router.replace('/(auth)/signin/page');
  };

  return (
    <View>
      <Avatar onPress={() => setModalVisible(true)} />
      <LogoutModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onLogout={handleLogout}
      />
    </View>
  );
};

export default ProfileAvatar;