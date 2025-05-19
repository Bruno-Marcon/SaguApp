import { View, Text } from 'react-native';

type Props = {
  status?: 'pending' | 'approved' | 'refused';
};

export default function AuthorizationStatusBadge({ status }: Props) {
  const getColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'refused':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'approved':
        return 'Aprovada';
      case 'refused':
        return 'Recusada';
      default:
        return 'Indefinido';
    }
  };

  return (
    <View className={`px-3 py-1 rounded-full shadow-sm ${getColor()}`}>
      <Text className="text-[10px] font-bold uppercase tracking-wide">
        {getLabel()}
      </Text>
    </View>
  );
}
