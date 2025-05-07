import { View } from 'react-native';
import { Icon } from '../../atoms/icons/iconx';
import { CustomText } from '../../atoms/text/text';


export const ProfileHeader = ({ name, email }: { name: string; email: string }) => {
  return (
    <View className="items-center mb-8">
      <View className="bg-blue-100 rounded-full p-2 mb-4">
        <Icon name="user" size={60} color="#3B82F6" />
      </View>
      
      <CustomText variant="primary" size="xl" className="font-bold">
        {name}
      </CustomText>
      <CustomText variant="secondary" size="base">
        {email}
      </CustomText>
    </View>
  );
};