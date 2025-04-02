import {Text, View} from "react-native";


function PassordSubTitle(){
    return (
        <Text className="text-gray-600 mb-6">Esqueceu sua senha?</Text>
    )
}

function OrSubTitle() {
    return(
        <View className="flex-row items-center my-6 w-full">
            <View className="flex-1 h-px bg-gray-300" />
                <Text className="text-gray-500 mx-4">ou</Text>
            <View className="flex-1 h-px bg-gray-300" />
        </View>
    )
}

function GoogleSubtitle() {
    return <Text className="text-gray-600 font-bold">Entrar com Google</Text>
}

export {PassordSubTitle, OrSubTitle, GoogleSubtitle}