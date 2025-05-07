// components/molecules/menu/menuItem.tsx
import { TouchableOpacity, View } from 'react-native';
import { CustomText } from '../../atoms/text/text';
import { Icon, IconName, IconFamily } from '../../atoms/icons/iconx';

type MenuItemProps = {
  iconName: IconName; // Tipo genérico
  iconFamily?: IconFamily;
  title: string;
  onPress?: () => void;
};

export const MenuItem = ({ 
  iconName, 
  iconFamily = 'feather', 
  title, 
  onPress 
}: MenuItemProps) => {
  return (
    <TouchableOpacity className="flex-row items-center p-4 bg-white rounded-lg shadow-sm" onPress={onPress}>
      <Icon name={iconName} family={iconFamily} />
      <CustomText className="ml-4">{title}</CustomText>
      <View className="ml-auto">
        <Icon name="chevron-right" family="material" />
      </View>
    </TouchableOpacity>
  );
};