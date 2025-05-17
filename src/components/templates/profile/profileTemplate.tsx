// components/templates/profile/profileTemplate.tsx
import { View } from 'react-native'
import { Link, router } from 'expo-router'
import { ProfileHeader } from '../../molecules/header/profileHeader'
import { ProfileMenu } from '../../organisms/menu/profileMenu'
import { Button } from '../../atoms/button/button'
import { Logout } from '@//services/auth/authService'
import TemplateScreen from '../scrollView/templateScreen'
import Animated, { BounceInUp } from 'react-native-reanimated'

const handleLogout = async () => {
  await Logout()
  router.replace('/(auth)/signin/page')
}

type ProfileTemplateProps = {
  name: string
  email: string
  showBackButton?: boolean
}

export const ProfileTemplate = ({ 
  name, 
  email,
  showBackButton = true 
}: ProfileTemplateProps) => {
  return (
    <TemplateScreen withHeader={false} withBottomBar={false}>
      <View className="flex-1 px-4 pt-6 bg-white">
        <View className="mt-2">
          <ProfileHeader 
            name={name} 
            email={email} 
            showBackButton={showBackButton}
          />
        </View>

        <View className="mt-6">
          <ProfileMenu />
        </View>

        <Animated.View
          entering={BounceInUp.delay(100)}
          className="mt-auto mb-10"
        >
          <Button 
            title="Sair"
            variant="primary" 
            size="lg"
            className="w-full rounded-2xl"
            onPress={handleLogout}
          />
        </Animated.View>

      </View>
    </TemplateScreen>
  )
}