import { TouchableOpacity, Image, Text } from "react-native";


export default function GoogleButton(){
    return (

    <TouchableOpacity className="w-full p-4 bg-white rounded-full shadow-md flex-row items-center justify-center">
        <Image source={require('../../../assets/images/google.png')} className="w-6 h-6 mr-2" />
        <Text className="text-gray-600 font-bold">Entrar com Google</Text>
    </TouchableOpacity>

    )
}