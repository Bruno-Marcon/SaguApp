import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';

type FeatherIconName = React.ComponentProps<typeof Feather>['name'];
type IoniconName = React.ComponentProps<typeof Ionicons>['name'];
type MaterialIconName = React.ComponentProps<typeof MaterialIcons>['name'];

export type IconName = string;
export type IconFamily = 'feather' | 'ionicons' | 'material';

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  family?: IconFamily;
  className?: string;
};

export const Icon = ({ 
  name, 
  size = 24, 
  color = '#6B7280', 
  family = 'feather', 
  className = '' 
}: IconProps) => {
  const renderIcon = () => {
    try {
      switch (family) {
        case 'feather': return <Feather name={name as FeatherIconName} size={size} color={color} />;
        case 'ionicons': return <Ionicons name={name as IoniconName} size={size} color={color} />;
        case 'material': return <MaterialIcons name={name as MaterialIconName} size={size} color={color} />;
        default: return <Feather name={name as FeatherIconName} size={size} color={color} />;
      }
    } catch (e) {
      console.warn(`Ícone "${name}" não encontrado na família ${family}`);
      return <Feather name="alert-circle" size={size} color="red" />;
    }
  };

  return <View className={className}>{renderIcon()}</View>;
};