import * as LucideIcons from "lucide-react-native";
import { ComponentType } from "react";
import { ViewStyle } from "react-native";

type IconName = keyof typeof LucideIcons;

type DynamicIconProps = {
  name: IconName;
  color?: string;
  size?: number;
  style?: ViewStyle;
};

export default function DynamicIcon({
  name,
  color = "#4B5563",
  size = 24,
  style,
}: DynamicIconProps) {
  const IconComponent = LucideIcons[name] as ComponentType<any>;

  return IconComponent ? <IconComponent color={color} size={size} style={style} /> : null;
}
