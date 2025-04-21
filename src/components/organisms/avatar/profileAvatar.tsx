import React, { useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { Avatar } from '../../atoms/avatar/avatar';
import LogoutModal from '../../molecules/modal/logout';
import { Logout } from '@//services/auth/authService';

const ProfileAvatar: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    Logout();
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