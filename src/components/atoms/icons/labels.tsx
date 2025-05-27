import React from "react"
import { View, Text } from "react-native"
import { Feather } from "@expo/vector-icons"

type Props = {
  icon: keyof typeof Feather.glyphMap
  label: string
  active: boolean
}

export const IconLabel = ({ icon, label, active }: Props) => {
  return (
    <View className="items-center">
      <Feather
        name={icon}
        color={active ? "#16A34A" : "#64748b"} // verde ativo, cinza inativo
        size={active ? 28 : 24}               // aumenta tamanho se ativo
      />
      <Text className={`text-xs mt-1 ${active ? "text-green-600" : "text-slate-500"}`}>
        {label}
      </Text>
    </View>
  )
}
