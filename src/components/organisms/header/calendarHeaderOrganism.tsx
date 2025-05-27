import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowBack } from '../../atoms/button/arrowBack';

type Props = {
  title: string;
  onAddPress?: () => void;
  onBackPress?: () => void;
};

export const CalendarHeader = ({ title, onAddPress, onBackPress }: Props) => {
  return (
    <View className="flex-row items-center justify-between p-4 bg-emerald-800 rounded-b-xl shadow-sm pt-16">
      <View className="flex-row items-center">
        <ArrowBack className="mr-3" color="#FFFFFF" onPress={onBackPress} />
        <Text className="text-xl font-bold text-white">{title}</Text>
      </View>

      {onAddPress && (
        <TouchableOpacity
          onPress={onAddPress}
          className="bg-white px-3 py-1 rounded-lg"
        >
          <Text className="text-[#09A342] font-semibold text-sm">+ Novo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
