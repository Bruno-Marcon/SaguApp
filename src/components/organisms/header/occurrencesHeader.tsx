import { View, Text } from 'react-native';
import { ArrowBack } from '../../atoms/button/arrowBack';
import { AddButton } from '../../atoms/button/addButton';

type Props = {
  title: string;
  onCreatePress?: () => void;
};

export const OccurrenceHeader = ({ title,onCreatePress }: Props) => {
  return (
    <View className="flex-row items-center justify-between p-4 bg-[#EF4444] rounded-b-xl shadow-sm pt-16">
      <View className='flex-row items-center'>
        <ArrowBack className="mr-3" color="#FFFFFF" />
        <Text className="text-xl font-semibold text-white">{title}</Text>
      </View>
      {/* {onCreatePress && (
        <AddButton
          label="Nova"
          onPress={onCreatePress}
          backgroundColor="white"
          iconColor="#3B82F6"
          textColor="#3B82F6"
        />
      )} */}
    </View>
    
  );
};
