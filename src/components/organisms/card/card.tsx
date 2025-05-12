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
    <View className={`bg-white mt-5 rounded-xl p-2 w-[33%] items-center ${containerClassName || ""}`}>
      <Text className={`text-sm font-medium text-gray-800 mt-2 text-center ${titleClassName || ""}`}>
        {title}
      </Text>

      <View className="flex-row items-center justify-start mt-1 gap-x-8">
        {icon}
        <Text className={`text-2xl text-gray-500 text-center ${subtitleClassName || ""}`}>
          {subtitle}
        </Text>
      </View>
    </View>
  )
}

export default StatusCard
