import { View} from "react-native";
import LogoIFC from "../../atoms/logo/logoIFC";
import DynamicIcon from "../../atoms/icons/bell";
import ProfileAvatar from "../avatar/profileAvatar";

type DefaultNavBarProps = {
  logo?: JSX.Element;
  icons?: JSX.Element[];
  avatar?: JSX.Element;
};

const DefaultNavBar: React.FC<DefaultNavBarProps> = ({
  logo = <LogoIFC className="w-14 h-16" />,
  icons = [<DynamicIcon name="Bell"/>],
  avatar = <ProfileAvatar />,
}) => {
  return (
    <View className="flex-row items-center justify-between px-5 mb-8">
      {logo}

      <View className="flex-row items-center gap-4">
        {icons.map((icon, index) => (
          <View key={index}>{icon}</View>
        ))}
        {avatar}
      </View>
    </View>
  );
};

export default DefaultNavBar;
