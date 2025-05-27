import { TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
  onPress: () => void;
};

export const FloatingButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="absolute bottom-6 right-6 bg-[#3B82F6] rounded-full p-4 shadow-lg"
    >
      <Feather name="plus" size={24} color="white" />
    </TouchableOpacity>
  );
};
