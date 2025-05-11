import React from "react"
import { TouchableOpacity, Image, Text } from "react-native"



type EnterButtonProps = {
  onPress: () => void | Promise<void>
}

const EnterButton:React.FC<EnterButtonProps> = ({
    onPress
}) => {
    return (

    <TouchableOpacity className="w-full p-4 bg-green-600 rounded-full shadow-md mb-6" onPress={onPress}> 
        <Text className="text-white text-center font-bold">Entrar</Text>
    </TouchableOpacity>

    )
}

export default EnterButton