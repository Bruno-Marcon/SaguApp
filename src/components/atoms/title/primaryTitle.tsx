import React from "react";
import { Text } from "react-native";

type PrimaryTitleProps = {
  text: string;
  className?: string;
};

const PrimaryTitle: React.FC<PrimaryTitleProps> = ({ text, className = "text-primary" }) => {
  return <Text className={`text-2xl font-bold ${className}`}>{text}</Text>;
};

export default PrimaryTitle;
