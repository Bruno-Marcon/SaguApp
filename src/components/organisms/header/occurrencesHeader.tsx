import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import DropdownFilter from '../../atoms/filter/dropDownFilter';
import { ArrowBack } from '../../atoms/button/arrowBack';

type OccurrencesHeaderProps = {
  showBackButton?: boolean;
  onBackPress?: () => void;
};

export const OccurrencesHeader = ({ 
  showBackButton = true,
  onBackPress
}: OccurrencesHeaderProps) => {
  return (
    <View className=" mt-8 mb-2">
      {showBackButton && <ArrowBack onPress={onBackPress} className="mb-2" />}
      <Text className="text-2xl font-bold text-gray-800">Ocorrências</Text>
      
      <View className="flex-row justify-between mt-5 mb-2">
        <DropdownFilter label="Turma" value="Todos" />
        <DropdownFilter label="Ano" value="2024" />
        <DropdownFilter label="Período" value="20/10/2024" />
      </View>
      
      <View className="border border-gray-300 rounded-lg p-2 ml-auto w-1/2">
        <Text className="text-gray-500 text-xs">Até:</Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-gray-800">27/10/2024</Text>
          <Feather name="chevron-down" size={16} color="#6b7280" />
        </View>
      </View>
    </View>
  );
}