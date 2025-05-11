import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { CustomText } from '../components/atoms/text/text'
import { UserProfileData } from '../hook/useUserProfile'

export const renderLoadingState = () => (
  <View className="flex-1 items-center justify-center">
    <ActivityIndicator size="large" color="#3B82F6" />
  </View>
)

export const renderErrorState = (error: string) => (
  <View className="flex-1 items-center justify-center p-4">
    <CustomText className="text-center">
      {error}
    </CustomText>
  </View>
)

export const validateUserData = (data: UserProfileData | null) => {
  if (!data) return false;
  return !!data.name && !!data.email;
}