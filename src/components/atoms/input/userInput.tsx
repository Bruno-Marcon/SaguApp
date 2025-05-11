import React, { useState } from "react"
import { View, TextInput, TextInputProps, Pressable } from "react-native"
import { FontAwesome } from '@expo/vector-icons'


type IconInputProps = {
  leftIcon: keyof typeof FontAwesome.glyphMap
  placeholder: string
  secureTextEntry?: boolean
} & TextInputProps

export default function IconInput({
  leftIcon,
  placeholder,
  secureTextEntry = false,
  ...rest
}: IconInputProps) {

  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry)

  const toggleVisibility = () => setIsPasswordVisible(prev => !prev)

  return (
    <View className="w-full mb-6 flex-row items-center bg-white p-4 rounded-full shadow-md">
      <FontAwesome name={leftIcon} size={20} color="green" className="ml-3" />
      
      <TextInput
        className="flex-1 ml-3 text-gray-700"
        placeholder={placeholder}
        placeholderTextColor="#888"
        secureTextEntry={!isPasswordVisible && secureTextEntry}
        {...rest}
      />

      {secureTextEntry && (
        <Pressable onPress={toggleVisibility}>
          <FontAwesome
            name={isPasswordVisible ? "eye" : "eye-slash"}
            size={20}
            color="gray"
            className="mr-3"
          />
        </Pressable>
      )}
    </View>
  )
}
