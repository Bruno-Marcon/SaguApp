import { View} from 'react-native'
import LogoIFC from '../../atoms/logo/logoIFC'
import GoogleButton from '../../atoms/button/google'
import React from 'react'
import LoginForm from '../../molecules/form/loginForm'
import { SubTitleOr } from '../../atoms/subtitle/subtitle'


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
      <LogoIFC source={require("../../../assets/images/logo-ifc.png")} className="w-30 h-30 mb-20"  />
      <LoginForm text={text}/>
      {/* <SubTitleOr text={subSubTitle}/> */}
      {/* <GoogleButton/> */}
    </View>
  )
}
export default LoginScreen