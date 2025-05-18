import { View, Text } from 'react-native';
import AuthorizationStatusBadge from '../../atoms/badge/authorizationBadge';

type Props = {
  title: string;
  status?: 'pending' | 'approved' | 'refuse';
};

export default function AuthorizationCardHeader({ title, status }: Props) {
  return (
    <View className="flex-row justify-between items-start mb-1">
      <Text className="text-base font-bold text-gray-900 flex-1" numberOfLines={1}>
        {title}
      </Text>
      {status && <AuthorizationStatusBadge status={status} />}
    </View>
  );
}
