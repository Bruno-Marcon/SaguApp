import { Image, TouchableOpacity, View } from "react-native";
import React from "react";

type AvatarProps = {
  onPress?: () => void;
  imageUrl?: string;
  size?: number;
};

function Avatar({ onPress}: AvatarProps) {
  
  const avatar = (
    <View className="w-10 h-10 rounded-full bg-gray-200">
      <Image
        source={{ uri: 'https://github.com/bruno-marcon.png' }}
        className="w-10 h-10 rounded-full"
      />
    </View>
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{avatar}</TouchableOpacity>;
  }

  return avatar;
}

export { Avatar };
