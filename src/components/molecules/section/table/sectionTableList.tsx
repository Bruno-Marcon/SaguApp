import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Link, LinkProps } from "expo-router"
import { Feather } from "@expo/vector-icons"

interface SectionWithTableProps {
  title: string
  linkText: string
  href: LinkProps["href"]
  children?: React.ReactNode
}

const SectionTableList: React.FC<SectionWithTableProps> = ({
  title,
  linkText,
  href,
  children,
}) => {
  return (
    <View className="p-1">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-semibold text-gray-800">{title}</Text>
        <Link href={href} asChild>
          <TouchableOpacity className="flex-row items-center">
            <Text className="text-sm text-blue-900 mr-1">{linkText}</Text>
            <Feather name="chevron-right" size={20} color="#1E40AF" />
          </TouchableOpacity>
        </Link>
      </View>
      {children}
    </View>
  )
}

export default SectionTableList
