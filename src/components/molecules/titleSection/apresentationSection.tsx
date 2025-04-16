import React from "react";
import {Text } from "react-native";

type TitleSectionProps = {
  title: string;
  subtitle: string;
  selectedStudent?: string;
};

const ApresentationSection: React.FC<TitleSectionProps> = ({
  title,
  subtitle,
  selectedStudent
}) => {
  return (
      <Text className="text-2xl font-semibold text-white mb-2">
        {title} {selectedStudent && `${selectedStudent}!`}
        {"\n"}
        <Text className="text-base font-normal text-gray-200">
          {subtitle}
        </Text>
      </Text>
  );
};

export default ApresentationSection;
