import { Feather } from "@expo/vector-icons";
import { ViewStyle } from "react-native";

type IconName = keyof typeof Feather.glyphMap;

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
  return <Feather name={name} color={color} size={size} style={style} />;
}
