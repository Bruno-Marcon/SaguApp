import React from "react"
import { TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { IconLabel } from "../../atoms/icons/labels"
import { Feather } from "@expo/vector-icons"

type Props = {
  icon: keyof typeof Feather.glyphMap
  label: string
  route: string
  active: boolean
}

export const TabItem = ({ icon, label, route, active }: Props) => {
  const router = useRouter()

  return (
    <TouchableOpacity onPress={() => router.push(route)}>
      <IconLabel icon={icon} label={label} active={active} />
    </TouchableOpacity>
  )
}
