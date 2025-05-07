import { View } from 'react-native';
import { MenuItem } from '../../molecules/menu/menuItem';

const menuItems = [
  { 
    iconName: 'settings-outline' as const,
    iconFamily: 'ionicons' as const,
    title: 'Account Settings' 
  },
  { 
    iconName: 'star-outline' as const,
    iconFamily: 'ionicons' as const,
    title: 'My Reviews' 
  },
  { 
    iconName: 'user' as const,
    iconFamily: 'feather' as const,
    title: 'Personal Information' 
  },
  { 
    iconName: 'notifications-outline' as const,
    iconFamily: 'ionicons' as const,
    title: 'Notification' 
  },
  { 
    iconName: 'fingerprint' as const,
    iconFamily: 'material' as const,
    title: 'Fingerprint Settings' 
  },
] satisfies Array<{
  iconName: string;
  iconFamily?: 'feather' | 'ionicons' | 'material';
  title: string;
}>;

export const ProfileMenu = () => {
  return (
    <View className="space-y-4">
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          iconName={item.iconName}
          iconFamily={item.iconFamily}
          title={item.title}
        />
      ))}
    </View>
  );
};