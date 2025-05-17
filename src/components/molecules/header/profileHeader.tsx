// components/molecules/header/profileHeader.tsx
import { View } from 'react-native'
import { CustomText } from '../../atoms/text/text'
import ProfileAvatar from '../../organisms/avatar/profileAvatar'
import { ArrowBack } from '../../atoms/button/arrowBack'
import Animated, { FadeInUp, FadeIn, SlideInLeft, BounceInUp } from 'react-native-reanimated';

type ProfileHeaderProps = {
  name: string
  email: string
  showBackButton?: boolean
  onBackPress?: () => void
}

export const ProfileHeader = ({ 
  name, 
  email,
  showBackButton = true,
  onBackPress
}: ProfileHeaderProps) => {
  return (
    <View className="mb-10">
      {showBackButton && (
        <ArrowBack 
          onPress={onBackPress}
          className="mb-4"
          color='#16A34A'
          size={28}
        />
      )}

      <View className="items-center">
        <Animated.View
          entering={FadeInUp.duration(600).delay(200)}
          className="bg-green-100 p-2 rounded-full border-2 border-green-500 mb-4 shadow-sm"
        >
          <ProfileAvatar size={80} modal={false} />
        </Animated.View>

        <Animated.View entering={FadeIn.delay(400)}>
          <CustomText variant="primary" size="xl" className="font-bold text-gray-900">
            {name}
          </CustomText>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(600)}>
          <CustomText variant="secondary" size="sm" className="text-gray-500">
            {email}
          </CustomText>
        </Animated.View>
      </View>
    </View>
  )
}