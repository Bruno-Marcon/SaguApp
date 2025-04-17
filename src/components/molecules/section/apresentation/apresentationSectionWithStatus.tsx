import React from "react";
import { View } from "react-native";
import { LucideIcon } from "lucide-react-native";
import StatusCard from "../../../organisms/card/card";
import TitleSection from "../../../atoms/title/primaryTitle";

interface ApresentationSectionProps {
  title: string;
  subtitle: string;
}

interface StatusCardItem {
  icon: React.ReactElement<LucideIcon>;
  title: string;
  subtitle: string;
}

interface ApresentationSectionWithStatusProps {
  apresentationProps: ApresentationSectionProps;
  statusCards: StatusCardItem[];
  containerClassName?: string;
}

const ApresentationSectionWithStatus: React.FC<ApresentationSectionWithStatusProps> = ({
  apresentationProps,
  statusCards,
  containerClassName = "p-5 bg-green-600",
}) => {
  return (
    <View className={containerClassName}>
      <TitleSection
        title={apresentationProps.title}
        subtitle={apresentationProps.subtitle}
      />

      <View className="flex-row justify-between mt-5">
        {statusCards.map((card, index) => (
          <StatusCard
            key={index}
            icon={card.icon}
            title={card.title}
            subtitle={card.subtitle}
          />
        ))}
      </View>
    </View>
  );
};

export default ApresentationSectionWithStatus;
