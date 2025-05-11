import { View, Text, TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"
import { formatDate } from "@//utils/dateUtils"

interface CardAtomProps {
  title: string
  description: string
  createdAt?: Date | string
  authorName?: string
  isNew?: boolean
  status?: string
  category?: string
  iconName?: string
  iconColor?: string
  borderColor?: string
  className?: string
  onPress?: () => void
  studentName?: string
  parentName?: string
}

export default function CardAtomOccurrences({
  title = "Sem título",
  description = "Sem descrição disponível.",
  createdAt,
  authorName = "Autor desconhecido",
  isNew = true,
  status = "Aberto",
  category = "Geral",
  iconName = "alert-triangle",
  iconColor = "#F59E0B",
  borderColor = "#F59E0B",
  className = "mb-1 bg-white rounded-xl shadow-sm",
  onPress,
  studentName
}: CardAtomProps) {
  const today = new Date()
  const formattedTime = createdAt
    ? formatDate(createdAt)
    : `Hoje às ${today.getHours()}:${today.getMinutes().toString().padStart(2, "0")}`

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${className}`}
      activeOpacity={0.7}
    >
      <View
        className="p-4 flex-row items-start"
        style={{
          borderLeftWidth: 4,
          borderLeftColor: borderColor,
          maxHeight: 200,
        }}
      >
        <View className="mr-4 mt-2">
          <Feather size={30} color={iconColor} />
        </View>

        <View className="flex-1">
          <View className="flex-row items-center flex-wrap">
            <Text className="text-base font-semibold text-gray-800 mr-2">{title}</Text>
            {isNew && (
              <View className="bg-orange-100 rounded-full">
                <Text className="text-xs font-medium text-orange-600">{status}</Text>
              </View>
            )}
          </View>

          <Text className="text-sm text-gray-600" numberOfLines={2}>
            {description}
          </Text>

          <View className="mt-1">
            <View className="flex-col mb-1">
              <Text className="text-xs text-gray-500">{authorName}</Text>

              {category && (
                <View className="bg-blue-100 rounded-full mt-1 p-2 items-center">
                  <Text className="text-xs font-medium text-blue-600">{category}</Text>
                </View>
              )}
            </View>

            <Text className="text-xs text-gray-400">{formattedTime}</Text>

            {/* Exibir o nome do aluno e do responsável */}
            {studentName && (
              <Text className="text-xs text-gray-500">Aluno: {studentName}</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}