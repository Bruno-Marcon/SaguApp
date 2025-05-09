// components/atoms/button/arrowBack.tsx
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

type ArrowBackProps = {
  size?: number;
  color?: string;
  className?: string;
  onPress?: () => void;
};

export const ArrowBack = ({
  size = 24,
  color = '#3B82F6',
  className = '',
  onPress
}: ArrowBackProps) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/');
      }
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`p-1 ${className}`}
      activeOpacity={0.7}
    >
      <Feather name="arrow-left" size={size} color={color} />
    </TouchableOpacity>
  );
};