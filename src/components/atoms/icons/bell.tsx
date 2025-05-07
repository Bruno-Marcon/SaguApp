import { Feather } from "@expo/vector-icons";
import { StyleProp, TextStyle } from "react-native";

type IconName = keyof typeof Feather.glyphMap;

type DynamicIconProps = {
  name: IconName;
  color?: string;
  size?: number;
  style?: StyleProp<TextStyle>;
};

export default function DynamicIcon({
  name,
  color = "#4B5563",
  size = 24,
  style,
}: DynamicIconProps) {
  return <Feather name={name} color={color} size={size} style={style} />;
}
