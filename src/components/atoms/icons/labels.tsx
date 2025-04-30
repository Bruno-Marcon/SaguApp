import React from "react";
import { View, Text } from "react-native";
import { LucideIcon } from "lucide-react-native";

type Props = {
  icon: LucideIcon;
  label: string;
  active: boolean;
};

export const IconLabel = ({ icon: Icon, label, active }: Props) => {
  return (
    <View className="items-center">
      <Icon color={active ? "#16A34A" : "#64748b"} size={24} />
      <Text className={`text-xs mt-1 ${active ? "text-green-600" : "text-slate-500"}`}>
        {label}
      </Text>
    </View>
  );
};
