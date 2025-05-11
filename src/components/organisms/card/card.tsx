import React from "react"
import { View, Text } from "react-native"

type StatusCardProps = {
  icon: React.ReactNode
  title: string
  subtitle: string
  containerClassName?: string
  titleClassName?: string
  subtitleClassName?: string
}

const StatusCard: React.FC<StatusCardProps> = ({
  icon,
  title,
  subtitle,
  containerClassName,
  titleClassName,
  subtitleClassName,
}) => {
  return (
    <View className={`bg-white rounded-xl p-2 w-[33%] items-center ${containerClassName || ""}`}>
      {icon}
      <Text className={`text-sm font-medium text-gray-800 mt-2 text-center ${titleClassName || ""}`}>
        {title}
      </Text>
      <Text className={`text-xs text-gray-500 mt-1 text-center ${subtitleClassName || ""}`}>
        {subtitle}
      </Text>
    </View>
  )
}

export default StatusCard
