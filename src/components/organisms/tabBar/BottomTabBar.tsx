import React from "react"
import { View } from "react-native"
import { usePathname } from "expo-router"
import { Feather } from "@expo/vector-icons"
import { TabItem } from "../../molecules/tab/tabItens"

type Route =
  | "/(panel)/home/page"
  | "/(panel)/schedules/page"
  | "/(panel)/authorization/page"
  | "/(panel)/occurences/occurences"
  | "/(panel)/settings/page"

const tabs: { label: string; icon: keyof typeof Feather.glyphMap; route: Route }[] = [
  { label: "Calendário", icon: "calendar", route: "/(panel)/schedules/page" },
  { label: "Autorizações", icon: "file-text", route: "/(panel)/authorization/page" },
  { label: "Home", icon: "home", route: "/(panel)/home/page" },
  { label: "Ocorrências", icon: "clock", route: "/(panel)/occurences/occurences" },
  { label: "Perfil", icon: "user", route: "/(panel)/settings/page" },
]

const neonStyle = {
  color: "#22c55e", // verde
  textShadowColor: "#22c55e",
  textShadowOffset: { width: 0, height: 0 },
  textShadowRadius: 10,
}

export default function BottomTabBar() {
  const pathname = usePathname()

  return (
    <View className="flex-row justify-around items-center bg-white rounded-t-2xl p-6 shadow-md shadow-black/10 relative">
      {tabs.map((tab) => {
        const normalizeRoute = (route: string) => route.replace(/^\/\(panel\)/, '')
        const tabRouteNormalized = normalizeRoute(tab.route)
        const active =
          pathname === tabRouteNormalized || pathname.startsWith(`${tabRouteNormalized}/`)

        return (
          <TabItem
            key={tab.label}
            icon={tab.icon}
            label={tab.label}
            route={tab.route}
            active={active}
          />
        )
      })}
    </View>
  )
}
