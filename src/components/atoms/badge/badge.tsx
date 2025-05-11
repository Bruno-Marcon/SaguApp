import React from 'react'
import { View, Text } from 'react-native'

interface BadgeProps {
  text: string
}

const Badge: React.FC<BadgeProps> = ({ text}) => {
  return (
    <View className='py-1 px-2 rounded'>
      <Text className='text-xs'>{text}</Text>
    </View>
  )
}

export default Badge

