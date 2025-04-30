import React from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { IconLabel } from "../../atoms/icons/labels";
import { LucideIcon } from "lucide-react-native";

type Props = {
  icon: LucideIcon;
  label: string;
  route: string;
  active: boolean;
};

export const TabItem = ({ icon, label, route, active }: Props) => {
  const router = useRouter();

  return (
    <TouchableOpacity>
      <IconLabel icon={icon} label={label} active={active} />
    </TouchableOpacity>
  );
};
