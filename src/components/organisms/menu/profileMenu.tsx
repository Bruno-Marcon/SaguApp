import { View } from 'react-native'
import { MenuItem } from '../../molecules/menu/menuItem'
import Animated, { SlideInLeft } from 'react-native-reanimated'

const menuItems = [
  { 
    iconName: 'settings-outline' as const,
    iconFamily: 'ionicons' as const,
    title: 'Configurações da conta' 
  },
  { 
    iconName: 'user' as const,
    iconFamily: 'feather' as const,
    title: 'Informações de perfil' 
  },
  { 
    iconName: 'notifications-outline' as const,
    iconFamily: 'ionicons' as const,
    title: 'Notificações' 
  },
] satisfies Array<{
  iconName: string
  iconFamily?: 'feather' | 'ionicons' | 'material'
  title: string
}>

export const ProfileMenu = () => {
  return (
    <View className="gap-y-4">
      {menuItems.map((item, index) => (
        <View
          key={index}
        >
          <MenuItem
            iconName={item.iconName}
            iconFamily={item.iconFamily}
            title={item.title}
          />
        </View>
      ))}
    </View>
  )
}