import {Image} from "react-native";


export default function LogoIFC(){
    return (
        <Image 
        source={require('../../../assets/images/logo-ifc.png')} 
        className="w-41 h-41 mb-10"
        resizeMode="contain"
      />
    )
}