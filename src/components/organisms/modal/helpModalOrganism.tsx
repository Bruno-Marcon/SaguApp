import React, { useState, useEffect } from 'react'
import { Animated, TouchableOpacity, Text, View } from 'react-native'

type HelpModalProps = {
  isVisible: boolean
  onClose: () => void
  onHelpPress: () => void
  onReportPress: () => void
}

const HelpModal = ({ isVisible, onClose, onHelpPress, onReportPress }: HelpModalProps) => {
  const [slideAnim] = useState(new Animated.Value(0))
  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
  }, [isVisible])

  return (
    <Animated.View
      style={{
        transform: [{
          translateY: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [300, 0],
          }),
        }],
      }}
      className="absolute bottom-0 w-full bg-white p-6 rounded-t-xl"
    >
      <Text className="text-xl font-bold mb-6 text-center">Como podemos ajudar?</Text>

      <TouchableOpacity
        className="w-full py-4 border-b border-gray-200 items-center"
        onPress={onHelpPress}
      >
        <Text className="text-lg text-green-500">Pedir ajuda</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="w-full py-4 border-b border-gray-200 items-center"
        onPress={onReportPress}
      >
        <Text className="text-lg text-green-500">Relatar um problema</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onClose} className="mt-6 bg-green-500 py-2 px-4 rounded-full">
        <Text className="text-white font-bold">Fechar</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default HelpModal
