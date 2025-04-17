import React from "react";
import { View, Text } from "react-native";

interface GradeItem {
  subject: string;
  grade: string;
}

interface GradesListProps {
  grades: GradeItem[];
}

const GradesList: React.FC<GradesListProps> = ({ grades }) => {
  return (
    <View className="bg-white rounded-xl p-4">
      {grades.map((item, index) => (
        <View
          key={index}
          className="flex-row justify-between items-center py-2 border-b border-gray-200"
        >
          <Text className="text-base text-gray-800">{item.subject}</Text>
          <Text className="text-base font-semibold text-green-600">{item.grade}</Text>
        </View>
      ))}
    </View>
  );
};

export default GradesList;