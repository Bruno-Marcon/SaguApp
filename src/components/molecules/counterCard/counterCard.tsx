import React from "react";
import { View, Text } from "react-native"
import { SubTitle } from "../../atoms/subtitle/subtitle"

type CounterCardProps = {
  count: number | string
  label: string
  className?: string
  countClassName?: string
  labelClassName?: string
  colorClass?: string
};

const CounterCard: React.FC<CounterCardProps> = ({
  count,
  label,
  className = "items-center",
  countClassName = "text-2xl font-bold text-primary",
  colorClass = "text-black-800",
  labelClassName,
}) => {
  return (
    <View className={className}>
        <Text className={`${countClassName} ${colorClass}`}>{count}</Text>
        <SubTitle text={label} className={labelClassName} />
    </View>
  );
};

export default CounterCard;
