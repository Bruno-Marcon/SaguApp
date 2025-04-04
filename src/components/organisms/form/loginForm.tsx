import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import IconInput from "../../atoms/input/userInput";
import Links from "../../atoms/link/link";

type LoginFormProps = {
  text:string 
}

const LoginForm:React.FC<LoginFormProps> = ({
  text
}) => {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View className="w-full">
      <IconInput
        leftIcon="user"
        placeholder="Digite seu usuário"
        keyboardType="email-address"
        value={user}
        onChangeText={setUser}
      />
      <IconInput
        leftIcon="lock"
        placeholder="Digite sua senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Links text={text} className="text-green-600"/>
    </View>
  );
}

export default LoginForm
