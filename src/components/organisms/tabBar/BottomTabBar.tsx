import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Home, Search, Plus, Clock, User } from "lucide-react-native";
import { TabItem } from "../../molecules/tab/tabItens";

export default function BottomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { label: "Home", icon: Home, route: "/home" },
    { label: "Search", icon: Search, route: "/search" },
    { label: "History", icon: Clock, route: "/history" },
    { label: "Profile", icon: User, route: "/profile" },
  ];

  return (
    <View className="flex-row justify-around items-center bg-white rounded-t-2xl p-4 shadow-md shadow-black/10">
      {tabs.slice(0, 2).map((tab) => (
        <TabItem
          key={tab.label}
          {...tab}
          active={pathname.startsWith(tab.route)}
        />
      ))}

      <TouchableOpacity
        onPress={() => router.push("/")}
        className="bg-green-500 p-4 rounded-full -mt-10 shadow-lg shadow-green-300"
      >
        <Plus color="white" size={24} />
      </TouchableOpacity>

      {tabs.slice(2).map((tab) => (
        <TabItem
          key={tab.label}
          {...tab}
          active={pathname.startsWith(tab.route)}
        />
      ))}
    </View>
  );
}
