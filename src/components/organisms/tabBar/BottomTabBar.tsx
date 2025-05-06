import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { TabItem } from "../../molecules/tab/tabItens";

export default function BottomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { label: "Home", icon: "home" as keyof typeof Feather.glyphMap, route: "/home" },
    { label: "Search", icon: "search" as keyof typeof Feather.glyphMap, route: "/search" },
    { label: "History", icon: "clock" as keyof typeof Feather.glyphMap, route: "/history" },
    { label: "Profile", icon: "user" as keyof typeof Feather.glyphMap, route: "/profile" },
  ];
  
  return (
    <View className="flex-row justify-around items-center bg-white rounded-t-2xl p-4 shadow-md shadow-black/10">
      {tabs.slice(0, 2).map((tab) => (
        <TabItem
          key={tab.label}
          icon={tab.icon}  // Certifique-se de que 'icon' é um valor válido de Feather
          label={tab.label}
          route={tab.route}
          active={pathname.startsWith(tab.route)}
        />
      ))}

      <TouchableOpacity
        onPress={() => router.push("/")}
        className="bg-green-500 p-4 rounded-full -mt-10 shadow-lg shadow-green-300"
      >
        <Feather name="plus" color="white" size={24} />
      </TouchableOpacity>

      {tabs.slice(2).map((tab) => (
        <TabItem
          key={tab.label}
          icon={tab.icon}  // Certifique-se de que 'icon' é um valor válido de Feather
          label={tab.label}
          route={tab.route}
          active={pathname.startsWith(tab.route)}
        />
      ))}
    </View>
  );
}
