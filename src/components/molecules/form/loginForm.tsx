import { View } from "react-native";
import IconInput from "../../atoms/input/userInput";
import Links from "../../atoms/link/link";
import EnterButton from "../../atoms/button/EnterButton";
import { useController, useForm, Control } from "react-hook-form";
import { router } from "expo-router";
import { HandleLogin } from "../../../services/auth/authService";
import Toast from 'react-native-toast-message';
import { useState } from "react";
import { LoginFormData } from "../../../../types/auth";

type LoginFormProps = {
  text: string;
};

type InputProps = {
  name: keyof LoginFormData;
  control: Control<LoginFormData>;
};

const Input: React.FC<InputProps> = ({ name, control }) => {
  const { field } = useController<LoginFormData>({
    name,
    control,
    defaultValue: '',
  });

  return (
    <IconInput
      value={field.value}
      onChangeText={field.onChange}
      leftIcon={name === "email" ? "at" : "lock"}
      placeholder={`Digite seu ${name === "email" ? "email" : "senha"}`}
      secureTextEntry={name === "password"}
    />
  );
};

const LoginForm: React.FC<LoginFormProps> = ({ text }) => {
  const { control, handleSubmit } = useForm<LoginFormData>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      await HandleLogin(data.email, data.password);

      Toast.show({
        type: 'success',
        text1: 'Login realizado com sucesso!',
        text2: 'Bem-vindo 👋',
      });

      router.replace('/(panel)/home/page');
    } catch (err) {
      let message = 'Erro ao fazer login. Tente novamente.';

      if (err instanceof Error) {
        console.error('Erro:', err.message);
        message = err.message;
      } else {
        console.error('Erro inesperado:', err);
      }

      Toast.show({
        type: 'error',
        text1: 'Erro no login',
        text2: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="w-full">
      <Input name="email" control={control} />
      <Input name="password" control={control} />
      <Links text={text} className="text-green-600" />
      <EnterButton onPress={handleSubmit(onSubmit)} loading={loading} />
    </View>
  );
};

export default LoginForm;
