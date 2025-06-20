// components/molecules/section/attendance/sectionAttendance.tsx
import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"

interface AttendanceSectionProps {
  title: string
  percentage: number
  linkText?: string
  onPressLink?: () => void
  onPressDetails?: () => void // Adicionado
}

const AttendanceSection: React.FC<AttendanceSectionProps> = ({
  title,
  percentage,
  linkText = "Ver detalhes",
  onPressLink,
  onPressDetails,
}) => {
  return (
    <View className="p-5">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-semibold text-gray-800">{title}</Text>
        {(onPressLink || onPressDetails) && (
          <TouchableOpacity 
            className="flex-row items-center" 
            onPress={onPressLink || onPressDetails}
          >
            <Text className="text-sm text-blue-900 mr-1">{linkText}</Text>
            <Feather name="chevron-right" size={20} color="#1E40AF" />
          </TouchableOpacity>
        )}
      </View>

      <View className="bg-white rounded-xl p-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-base text-gray-800">Presença Total</Text>
          <Text className="text-xl font-semibold text-green-600">{percentage}%</Text>
        </View>
        <View className="h-2 bg-gray-200 rounded-full">
          <View
            className="h-full bg-green-600 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </View>
      </View>
    </View>
  )
}

export default AttendanceSection