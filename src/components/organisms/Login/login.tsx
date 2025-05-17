import { View} from 'react-native'
import LogoIFC from '../../atoms/logo/logoIFC'
import React from 'react'
import LoginForm from '../../molecules/form/loginForm'

type LoginScreenProps = {
    text: string
    subSubTitle:string
    viewClassName?:string
}
const LoginScreen:React.FC<LoginScreenProps> = ({
    text,
    subSubTitle,
    viewClassName = "flex-1 justify-center items-center bg-gray-100 p-9"
}) => {
  return (
    <View className={viewClassName}>
      <LogoIFC source={require("../../../assets/images/logo-sagu-mobile-brancoBg.png")} className="w-15 h-15 mb-20"  />
      <LoginForm text={text}/>
    </View>
  )
}
export default LoginScreen