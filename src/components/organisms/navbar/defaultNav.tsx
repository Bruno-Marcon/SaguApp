import { View } from 'react-native';
import { JSX } from 'react';
import ProfileAvatar from '../avatar/profileAvatar';
import LogoSagu from '../../atoms/logo/logoSagu';
import { BellWithModal } from '../header/bell/bellWithModal';

type DefaultNavBarProps = {
  logo?: JSX.Element;
  icons?: JSX.Element[];
  avatar?: JSX.Element;
};

const DefaultNavBar: React.FC<DefaultNavBarProps> = ({
  logo = <LogoSagu className="w-14 h-14" />,
  avatar = <ProfileAvatar size={40} modal={true} />,
}) => {
  return (
    <View
      className="
        flex-row items-center gap-x-4 justify-between px-4 pt-safe pb-2
        bg-emerald-700 dark:bg-emerald-800 border-b border-emerald-800 dark:border-emerald-800
      "
    >
      {logo}

      <View className="flex-row items-center gap-x-4">
        <BellWithModal />
        {avatar}
      </View>
    </View>
  );
};

export default DefaultNavBar;
