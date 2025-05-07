import { View } from "react-native";
import LogoIFC from "../../atoms/logo/logoIFC";
import DynamicIcon from "../../atoms/icons/bell";
import { JSX } from "react";
import ProfileAvatar from "../avatar/profileAvatar";

type DefaultNavBarProps = {
  logo?: JSX.Element;
  icons?: JSX.Element[];
  avatar?: JSX.Element;
};

const DefaultNavBar: React.FC<DefaultNavBarProps> = ({
  logo = <LogoIFC className="w-14 h-14" />,
  icons = [<DynamicIcon name="bell" size={24} color="#4B5563" />],
  avatar = <ProfileAvatar />,
}) => {
  return (
    <View className="flex-row items-center gap-x-4 justify-between px-4 py-4">
      {logo}

      <View className="flex-row items-center gap-x-4">
        {icons.map((icon, index) => (
          <View key={index}>{icon}</View>
        ))}
        {avatar}
      </View>
    </View>
  );
};

export default DefaultNavBar;
