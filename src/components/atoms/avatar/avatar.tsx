import { Image, View } from "react-native";

function Avatar() {
    return(
        <View className="w-10 h-10 rounded-full bg-gray-200">
            <Image
                source={{ uri: 'https://github.com/diego3g.png' }}
                className="w-10 h-10 rounded-full"
            />
        </View>
    )
}

export {Avatar}