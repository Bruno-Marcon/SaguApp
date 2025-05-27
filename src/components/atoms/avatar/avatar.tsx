import { getUserInfo } from "@//storage/SecureUser";
import { useEffect, useState } from "react";
import { Avatar } from "react-native-elements";
import { useColorScheme } from "nativewind";

const getRandomColor = (isDark: boolean) => {
  return isDark ? '#1f2937' : '#9CA3AF'; // dark: slate-800 | light: gray-400
};

type Props = {
  size?: number;
  onPress?: () => void;
};

const InitialsAvatar = ({ size = 40, onPress }: Props) => {
  const [name, setName] = useState<string | null>(null);
  const { colorScheme } = useColorScheme();
  const [bgColor, setBgColor] = useState<string>(() => getRandomColor(colorScheme === 'dark'));

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      if (userInfo) setName(userInfo.name);
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    setBgColor(getRandomColor(colorScheme === 'dark'));
  }, [colorScheme]);

  const getInitials = (name: string) => {
    const names = name.trim().split(" ");
    return names.length >= 2
      ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      : `${names[0][0]}`.toUpperCase();
  };

  return (
    <Avatar
      rounded
      size={size}
      title={name ? getInitials(name) : ""}
      containerStyle={{ backgroundColor: bgColor }}
      onPress={onPress}
    />
  );
};

export default InitialsAvatar;
