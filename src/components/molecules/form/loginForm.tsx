import { View } from "react-native";
import IconInput from "../../atoms/input/userInput";
import Links from "../../atoms/link/link";
import EnterButton from "../../atoms/button/EnterButton";
import { useController, useForm, Control } from "react-hook-form";
import { router } from "expo-router";
import { login } from "../../../services/auth/authService";

type formData = {
  user: string;
  password: string;
};

type LoginFormProps = {
  text: string;
};

type InputProps = {
  name: keyof formData;
  control: Control<formData>;
};

const Input: React.FC<InputProps> = ({ name, control }) => {
  const { field } = useController<formData>({
    name,
    control,
    defaultValue: '',
  });

  return (
    <IconInput
      value={field.value}
      onChangeText={field.onChange}
      leftIcon={name === "user" ? "user" : "lock"}
      placeholder={`Digite sua ${name === "user" ? "usuário" : "senha"}`}
      secureTextEntry={name === "password"}
    />
  );
};

const LoginForm: React.FC<LoginFormProps> = ({ text }) => {
  const { control, handleSubmit } = useForm<formData>();

  const onsubmit = async (data: formData) => {
    try {
      const result = await login(data.user, data.password);
      console.log(data)
      console.log('Login bem-sucedido:', result);
      router.replace('/(panel)/home/page');
    } catch (err) {
      if (err instanceof Error) {
        console.error('Erro:', err.message);
      } else {
        console.error('Erro inesperado:', err);
      }
    }
  };

  return (
    <View className="w-full">
      <Input name="user" control={control} />
      <Input name="password" control={control} />
      <Links text={text} className="text-green-600" />
      <EnterButton onPress={handleSubmit(onsubmit)} />
    </View>
  );
};

export default LoginForm;
