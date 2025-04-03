import { View} from 'react-native';
import GoogleButton from '../components/atoms/button/google';
import EnterButton from '../components/atoms/button/EnterButton';
import LogoIFC from '../components/atoms/logo/logoIFC';
import { PasswordInput,UserInput } from '../components/atoms/input/userInput';
import { SubTitle, SubTitleOr } from '../components/atoms/subtitle/subtitle';

export default function LoginScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-8">
      <LogoIFC/>
      <UserInput/>
      <PasswordInput/>
      <SubTitle text='Esqueceu sua senha?'/>
      <EnterButton/>
      <SubTitleOr text='ou'/>
      <GoogleButton/>
    </View>
  );
}
