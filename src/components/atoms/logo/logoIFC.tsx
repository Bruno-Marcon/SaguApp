import {Image} from "react-native";


export default function LogoIFC(){
    return (
        <Image 
        source={require('../../../assets/images/logo-ifc.png')} 
        className="w-30 h-30 mb-10"
        resizeMode="contain"
      />
    )
}

