import { TouchableOpacity, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
  label?: string;
  onPress?: () => void;
  iconColor?: string;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
};

export const AddButton = ({
  label = 'Novo',
  onPress,
  iconColor = '#3B82F6',
  backgroundColor = 'white',
  textColor = '#3B82F6',
  className = '',
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center px-3 py-1 rounded-lg ${className}`}
      style={{ backgroundColor }}
      activeOpacity={0.8}
    >
      <Feather name="plus" size={16} color={iconColor} />
      <Text className="text-sm font-medium ml-1" style={{ color: textColor }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
