import { View, TextInput } from "react-native";
import { FontAwesome } from '@expo/vector-icons';


function UserInput(){

    return (    
        <View className="w-full mb-6 flex-row items-center bg-white p-4 rounded-full shadow-md">
            <FontAwesome name="user" size={20} color="green" className="ml-3" />
            <TextInput
            className="flex-1 ml-3 text-gray-700"
            placeholder="Digite seu usuário"
            keyboardType="email-address"
            />
        </View>
    )
}

function PasswordInput (){
    return (
        <View className="w-full mb-6 flex-row items-center bg-white p-4 rounded-full shadow-md">
        <FontAwesome name="lock" size={20} color="green" className="ml-3" />
        <TextInput
          className="flex-1 ml-3 text-gray-700"
          placeholder="Digite sua senha"
          secureTextEntry
        />
        <FontAwesome name="eye" size={20} color="gray" className="mr-3" />
      </View>
    )
}

export {PasswordInput, UserInput}