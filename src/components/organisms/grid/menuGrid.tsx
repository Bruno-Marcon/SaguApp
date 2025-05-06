import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import DynamicIcon from "../../atoms/icons/bell";
import { LinkProps } from "expo-router";
import { Feather } from "@expo/vector-icons";

type IconName = keyof typeof Feather.glyphMap;

type MenuItem = {
  id: number;
  title: string;
  icon: IconName;
  href: LinkProps["href"];
};

type MenuGridProps = {
  title?: string;
  item: readonly MenuItem[];
};

const MenuGrid: React.FC<MenuGridProps> = ({ item }) => {
  return (
    <View className="flex-row flex-wrap justify-between gap-y-4">
      {item.map((menu) => (
        <Link key={menu.id} href={menu.href} asChild>
          <Pressable className="w-[31%] aspect-square bg-gray-50 rounded-xl items-center justify-center">
            <DynamicIcon name={menu.icon} size={28} color="#4B5563" />
            <Text className="text-xs text-center text-gray-600 mt-2">{menu.title}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
};

export default MenuGrid;
