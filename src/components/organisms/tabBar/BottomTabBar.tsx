import React, { useState } from "react"
import { View, TouchableOpacity } from "react-native"
import { useRouter, usePathname } from "expo-router"
import { Feather } from "@expo/vector-icons"
import { TabItem } from "../../molecules/tab/tabItens"

export default function BottomTabBar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOptionsVisible, setIsOptionsVisible] = useState(false)

  const tabs = [
    { label: "Calendário", icon: "calendar" as keyof typeof Feather.glyphMap, route: "/(panel)/schedules/page" },
    { label: "Autorizações", icon: "file-text" as keyof typeof Feather.glyphMap, route: "/(panel)/authorization/page" },
    { label: "Ocorrências", icon: "clock" as keyof typeof Feather.glyphMap, route: "/(panel)/occurences/occurences" },
    { label: "Perfil", icon: "user" as keyof typeof Feather.glyphMap, route: "/(panel)/profile/profile" },
  ]

  const handleOptionPress = (option: string) => {
    setIsOptionsVisible(false)
    switch (option) {
      case "checkin":
        console.log("Check In")
        break
      case "review":
        console.log("Review")
        break
      case "photo":
        console.log("Add Photo")
        break
    }
  }

  return (
    <View className="flex-row justify-around items-center bg-white rounded-t-2xl p-6 shadow-md shadow-black/10 relative">
      
      {/* Primeira metade dos tabs */}
      {tabs.slice(0, 2).map((tab) => (
        <TabItem
          key={tab.label}
          icon={tab.icon}
          label={tab.label}
          route={tab.route}
          active={pathname.startsWith(tab.route)}
        />
      ))}

      {/* Botão central */}
      <View className="relative -mt-10">
      <TouchableOpacity
        onPress={() => setIsOptionsVisible(!isOptionsVisible)}
        className="bg-green-500 p-4 rounded-full shadow-lg shadow-green-300 z-10 transform -translate-x-[14px]" // Ajuste aqui
      >
        <Feather name={isOptionsVisible ? "x" : "plus"} color="white" size={24} />
      </TouchableOpacity>

      {isOptionsVisible && (
          <View className="absolute bottom-full left-1/2 transform -translate-x-1/2 flex-row items-center mb-8 gap-x-3">
            <TouchableOpacity
              className="bg-green-500 p-5 rounded-full shadow-md shadow-green-100"
              onPress={() => handleOptionPress("checkin")}
            >
              <Feather name="check-circle" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-green-500 p-5 rounded-full shadow-md shadow-green-200"
              onPress={() => handleOptionPress("review")}
            >
              <Feather name="edit-2" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-green-500 p-5 rounded-full shadow-md shadow-green-300"
              onPress={() => handleOptionPress("photo")}
            >
              <Feather name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Segunda metade dos tabs */}
      {tabs.slice(2).map((tab) => (
        <TabItem
          key={tab.label}
          icon={tab.icon}
          label={tab.label}
          route={tab.route}
          active={pathname.startsWith(tab.route)}
        />
      ))}
    </View>
  )
}
