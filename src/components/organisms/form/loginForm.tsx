import { View } from "react-native"
import IconInput from "../../atoms/input/userInput"
import Links from "../../atoms/link/link"
import EnterButton from "../../atoms/button/EnterButton"
import { useController, useForm, Control, FieldValues } from "react-hook-form"

type formData = {
  user: string
  password: string
}

type LoginFormProps = {
  text: string
}

type InputProps = {
  name: keyof formData
  control: Control<formData>
}

const Input: React.FC<InputProps> = ({ name, control }) => {
  const { field } = useController<formData>({
    name,
    control,
    defaultValue: '',
  })

  return (
    <IconInput
      value={field.value}
      onChangeText={field.onChange}
      leftIcon={name === "user" ? "user" : "lock"}
      placeholder={`Digite sua ${name === "user" ? "usuário" : "senha"}`}
      secureTextEntry={name === "password"}
    />
  )
}

const LoginForm: React.FC<LoginFormProps> = ({ text }) => {
  const { control, handleSubmit } = useForm<formData>() // <- Tipado corretamente aqui

  const onsubmit = (data: formData) => {
    console.log(data)
  }

  return (
    <View className="w-full">
      <Input name="user" control={control} />
      <Input name="password" control={control} />
      <Links text={text} className="text-green-600" />
      <EnterButton onPress={handleSubmit(onsubmit)} />
    </View>
  )
}

export default LoginForm
