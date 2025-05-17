import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

type EnterButtonProps = {
  onPress: () => void | Promise<void>;
  title?: string;
  loading?: boolean;
};

const EnterButton: React.FC<EnterButtonProps> = ({
  onPress,
  title = "Entrar",
  loading = false,
}) => {
  return (
    <TouchableOpacity
      className="w-full p-4 bg-green-600 rounded-full shadow-md mb-6"
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-white text-center font-bold">{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default EnterButton;
