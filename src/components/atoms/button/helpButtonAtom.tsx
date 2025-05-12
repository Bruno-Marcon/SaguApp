import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

type HelpButtonProps = {
  onPress: () => void
}

const HelpButton = ({ onPress }: HelpButtonProps) => {
  return (
    <TouchableOpacity
      className="absolute top-3/4 right-5 bg-green-500 p-4 rounded-full shadow-lg"
      onPress={onPress}
    >
      <Ionicons name="help-circle-outline" size={30} color="white" />
    </TouchableOpacity>
  )
}

export default HelpButton
