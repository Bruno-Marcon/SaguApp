import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { IconLabel } from '../../atoms/icons/labels';
import { Feather } from '@expo/vector-icons';

type Route =
  | '/(panel)/home/page'
  | '/(panel)/schedules/page'
  | '/(panel)/authorization/page'
  | '/(panel)/occurences/occurences'
  | '/(panel)/settings/page';

type Props = {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  route: Route;
  active: boolean;
  iconSize?: number; // 👈 novo prop
};

export const TabItem = ({
  icon,
  label,
  route,
  active,
  iconSize = 24,
}: Props) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(route)}>
      <IconLabel icon={icon} label={label} active={active} iconSize={iconSize} />
    </TouchableOpacity>
  );
};
