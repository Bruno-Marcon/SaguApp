import { TouchableOpacity, View } from 'react-native';
import { CustomText } from '../../atoms/text/text';
import { Icon, IconName, IconFamily } from '../../atoms/icons/iconAtom';
import { useThemeApp } from '../../organisms/list/themeContext';

type MenuItemProps = {
  iconName: IconName;
  iconFamily?: IconFamily;
  title: string;
  onPress?: () => void;
  showToggle?: boolean;
};

export const MenuItem = ({
  iconName,
  iconFamily = 'feather',
  title,
  onPress,
  showToggle = false,
}: MenuItemProps) => {
  const { theme, toggleTheme } = useThemeApp();

  return (
    <TouchableOpacity
      className="flex-row items-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100"
      onPress={showToggle ? toggleTheme : onPress}
      activeOpacity={0.8}
    >
      <Icon name={iconName} family={iconFamily} className="text-green-600" />
      <CustomText className="ml-4 text-gray-800 font-medium">{title}</CustomText>
      <View className="ml-auto flex-row items-center gap-x-2">
        {showToggle && (
          <CustomText className="text-xs text-gray-400">
            {theme === 'dark' ? 'Escuro' : 'Claro'}
          </CustomText>
        )}
        <Icon name="chevron-right" family="material" className="text-gray-300" />
      </View>
    </TouchableOpacity>
  );
};
