import { View, Text } from 'react-native';
import { Authorization } from '../../../../types/authorizations';
import AuthorizationCard from '../../molecules/card/authorizationCard';

type Props = {
  title: string;
  data: Authorization[];
};

export default function AuthorizationList({ title, data }: Props) {
  return (
    <View className="mb-6">
      <Text className="text-lg font-bold text-gray-800 mb-2">{title}</Text>
      {data.map((authorization) => (
        <AuthorizationCard key={authorization.id} authorization={authorization} />
      ))}
    </View>
  );
}
