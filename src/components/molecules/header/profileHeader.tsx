// components/molecules/header/profileHeader.tsx
import { View } from 'react-native'
import { CustomText } from '../../atoms/text/text'
import ProfileAvatar from '../../organisms/avatar/profileAvatar'
import { ArrowBack } from '../../atoms/button/arrowBack'

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
    <View className="mb-8">
      {showBackButton && (
        <ArrowBack 
          onPress={onBackPress}
          className="mb-4"
          color='#09a342'
          size={29}
        />
      )}
      <View className="items-center">
        <View className="bg-blue-100 rounded-full p-2 mb-4">
          <ProfileAvatar size={80} modal={false}/>
        </View>
        
        <CustomText variant="primary" size="xl" className="font-bold">
          {name}
        </CustomText>
        <CustomText variant="secondary" size="base">
          {email}
        </CustomText>
      </View>
    </View>
  )
}