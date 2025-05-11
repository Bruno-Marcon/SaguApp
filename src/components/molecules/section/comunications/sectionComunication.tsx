import React, { JSX } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"

interface CommunicationItem {
  icon: JSX.Element
  title: string
  subtitle: string
}

interface CommunicationSectionProps {
  sectionTitle: string
  showLink?: boolean
  linkText?: string
  onPressLink?: () => void
  items: CommunicationItem[]
}

const CommunicationSection: React.FC<CommunicationSectionProps> = ({
  sectionTitle,
  showLink = false,
  linkText = "Ver todos",
  onPressLink,
  items,
}) => {
  return (
    <View className="p-1">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-semibold text-gray-800">{sectionTitle}</Text>
        {showLink && onPressLink && (
          <TouchableOpacity className="flex-row items-center" onPress={onPressLink}>
            <Text className="text-sm text-blue-900 mr-1">{linkText}</Text>
            <Feather name="chevron-right" size={20} color="#1E40AF" />
          </TouchableOpacity>
        )}
      </View>

      <View className="bg-white rounded-xl p-4">
        {items.map((item, index) => (
          <View
            key={index}
            className={`flex-row items-center ${index !== items.length - 1 ? "mb-4" : ""}`}
          >
            {item.icon}
            <View className="ml-3 flex-1">
              <Text className="text-base font-medium text-gray-800">{item.title}</Text>
              <Text className="text-sm text-gray-500 mt-1">{item.subtitle}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default CommunicationSection
