import { TouchableOpacity, Image, Text } from "react-native"
import { SubTitle } from "../subtitle/subtitle"
import GoogleimageLogo from "../logo/logoGoogle"


export default function GoogleButton(){
    return (

    <TouchableOpacity className="w-full p-4 bg-white rounded-full shadow-md flex-row items-center justify-center gap-3">
        <GoogleimageLogo/>
        <SubTitle text={"Entrar com o Google"} className="text-green-500"/>
    </TouchableOpacity>

    )
}