import React from "react";
import { View } from "react-native";
import PrimaryTitle from "../../atoms/title/primaryTitle";
import { SubTitle } from "../../atoms/subtitle/subtitle";

type TitleSectionProps = {
  title: string;
  subtitle: string;
  titleClassName?: string;
  subtitleClassName?: string;
  ViewClasName?: string
};

const TitleSection: React.FC<TitleSectionProps> = ({
  title,
  subtitle,
  titleClassName,
  subtitleClassName,
  ViewClasName,
}) => {
  return (
    <View className={ViewClasName}>
      <PrimaryTitle text={title} className={titleClassName} />
      <SubTitle text={subtitle} className={subtitleClassName} />
    </View>
  );
};

export default TitleSection;
