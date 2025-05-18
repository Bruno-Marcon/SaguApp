import { View, Text } from 'react-native'
import { ArrowBack } from '../../atoms/button/arrowBack'

type Props = {
  title: string
}

export const AuthorizationHeader = ({ title }: Props) => {
  return (
    <View className="flex-row items-center p-4 bg-[#3B82F6] rounded-b-xl shadow-sm pt-16">
      <ArrowBack className="mr-3" color="#FFFFFF" />
      <Text className="text-xl font-semibold text-white">{title}</Text>
    </View>
  )
}
