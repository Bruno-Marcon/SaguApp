import { TouchableOpacity, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type Props = {
  icon: keyof typeof FontAwesome.glyphMap;
  label: string;
  onPress: () => void;
};

export const ButtonWithIcon = ({ icon, label, onPress }: Props) => (
  <TouchableOpacity onPress={onPress} className="flex-row items-center space-x-2 bg-green-600 px-4 py-2 rounded-xl">
    <FontAwesome name={icon} size={18} color="#FFF" />
    <Text className="text-white font-medium">{label}</Text>
  </TouchableOpacity>
);