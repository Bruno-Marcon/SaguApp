// components/molecules/section/table/sectionTableList.tsx
import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Link, LinkProps } from "expo-router"
import { Feather } from "@expo/vector-icons"

interface SectionWithTableProps {
  title: string
  linkText: string
  href?: LinkProps["href"]
  onPressLink?: () => void // Adicionado
  children?: React.ReactNode
}

const SectionTableList: React.FC<SectionWithTableProps> = ({
  title,
  linkText,
  href,
  onPressLink,
  children,
}) => {
  return (
    <View className="p-1">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-semibold text-gray-800">{title}</Text>
        {href ? (
          <Link href={href} asChild>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-sm text-blue-900 mr-1">{linkText}</Text>
              <Feather name="chevron-right" size={20} color="#1E40AF" />
            </TouchableOpacity>
          </Link>
        ) : (
          <TouchableOpacity 
            className="flex-row items-center" 
            onPress={onPressLink}
          >
            <Text className="text-sm text-blue-900 mr-1">{linkText}</Text>
            <Feather name="chevron-right" size={20} color="#1E40AF" />
          </TouchableOpacity>
        )}
      </View>
      {children}
    </View>
  )
}

export default SectionTableList