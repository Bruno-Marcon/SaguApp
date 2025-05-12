import React, { useState } from 'react'
import { View } from 'react-native'
import { router } from 'expo-router'
import InitialsAvatar from '../../atoms/avatar/avatar'
import LogoutModal from '../modal/logout'
import { Logout } from '@//services/auth/authService'


type ProfileAvatarProps = {
  size: number
  modal: boolean
} 


export const ProfileAvatar = ({ 
  size = 40,
  modal = true
}: ProfileAvatarProps) => {
  const [modalVisible, setModalVisible] = useState(false)

  const handleLogout = async () => {
    await Logout()
    setModalVisible(false)
    router.replace('/(auth)/signin/page')
  }

  return (
    <View>
      <InitialsAvatar size={size} onPress={() => setModalVisible(modal)} />
      <LogoutModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onLogout={handleLogout}
      />
    </View>
  )
}

export default ProfileAvatar