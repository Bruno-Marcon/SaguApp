// components/atoms/card/OccurrenceCard.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { formatDate } from "@//utils/dateUtils";


interface OccurrenceCardProps {
  title: string;
  description: string;
  createdAt?: Date | string;
  className?: string;
  onPress?: () => void;
}

export default function OccurrenceCardAtom({
  title,
  description,
  createdAt,
  className = "p-2 rounded-xl shadow-lg mb-3 bg-white",
  onPress
}: OccurrenceCardProps) {
  return (
    <TouchableOpacity onPress={onPress} className={className}>
      <View className="ml-2 flex-row items-center gap-x-4">
        <Feather name="alert-circle" size={28} color="#DC2626" />
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800">{title}</Text>
          <Text className="text-base text-gray-600 mt-1">{description}</Text>
          {createdAt && (
            <Text className="text-xs text-gray-500 mt-1">
              {formatDate(createdAt)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}