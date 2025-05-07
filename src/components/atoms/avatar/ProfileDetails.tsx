import React from 'react';
import { Text, View } from 'react-native';

interface ProfileDetailsProps {
  name: string;
  email: string;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ name, email }) => {
  return (
    <View className="mb-6">
      <Text className="text-lg">Nome: {name}</Text>
      <Text className="text-lg">Email: {email}</Text>
    </View>
  );
};

export default ProfileDetails;
