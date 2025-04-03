import { View, Image } from "react-native";
import { Avatar } from "../../atoms/avatar/avatar";
import LogoIFC from "../../atoms/logo/logoIFC";
import IconBell from "../../atoms/icons/bell";

type DefaultNavBarProps = {
  logo?: JSX.Element;
  icons?: JSX.Element[];
  avatar?: JSX.Element;
};

const DefaultNavBar: React.FC<DefaultNavBarProps> = ({
  logo = <LogoIFC className="w-16 h-16" />,
  icons = [<IconBell key="bell" />],
  avatar = <Avatar />,
}) => {
  return (
    <View className="flex-row items-center justify-between mb-8">
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
