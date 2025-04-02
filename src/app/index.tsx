import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function LoginScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-6">
      <Text className="text-2xl font-bold mb-6">Login</Text>
      
      <TextInput
        className="w-full p-3 border rounded-lg bg-white mb-2"
        placeholder="E-mail"
        keyboardType="email-address"
      />
      
      <TextInput
        className="w-full p-3 border rounded-lg bg-white mb-2"
        placeholder="Senha"
        secureTextEntry
      />
      
      <TouchableOpacity className="w-full p-3 bg-blue-500 rounded-lg mt-4">
        <Text className="text-white text-center font-bold">Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}