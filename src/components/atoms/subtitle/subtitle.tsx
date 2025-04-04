import { View, Text } from "react-native";

type SubTitleProps = {
  text: string
  className?: string
};

const SubTitle: React.FC<SubTitleProps> = ({ text, className = "text-gray-600" }) => {
  return <Text className={className}>{text}</Text>;
};

const SubTitleOr: React.FC<SubTitleProps> = ({ text, className = "flex-row items-center my-6 w-full" }) => {
  return (
    <View className={className}>
      <View className="flex-1 h-px bg-gray-300" />
      <Text className="text-gray-500 mx-4">{text}</Text>
      <View className="flex-1 h-px bg-gray-300" />
    </View>
  );
};

export { SubTitle, SubTitleOr };
