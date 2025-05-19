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
        <View
          className="bg-green-100 p-2 rounded-full border-2 border-green-500 mb-4 shadow-sm"
        >
          <ProfileAvatar size={80} modal={false} />
        </View>

        <View>
          <CustomText variant="primary" size="xl" className="font-bold text-gray-900">
            {name}
          </CustomText>
        </View>

        <View >
          <CustomText variant="secondary" size="sm" className="text-gray-500">
            {email}
          </CustomText>
        </View>
      </View>
    </View>
  )
}