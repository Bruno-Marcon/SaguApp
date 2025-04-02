import { TouchableOpacity, Image, Text } from "react-native";
import { GoogleSubtitle } from "../subtitle/subtitle";
import GoogleimageLogo from "../logo/logoGoogle";


export default function GoogleButton(){
    return (

    <TouchableOpacity className="w-full p-4 bg-white rounded-full shadow-md flex-row items-center justify-center">
        <GoogleimageLogo/>
        <GoogleSubtitle/>
    </TouchableOpacity>

    )
}