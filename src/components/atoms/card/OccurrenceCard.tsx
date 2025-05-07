import React from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useOccurrence } from "@//hook/useOccurence";
import { formatDate } from "@//utils/dateUtils";


export default function OccurrenceCard() {
  const { occurrences, loading, error } = useOccurrence();

  if (loading) return <ActivityIndicator size="large" color="#3498db" />;
  if (error) return <Text className="text-center text-red-500">{error}</Text>;
  if (!occurrences.length) return <Text className="text-center">Nenhuma ocorrência disponível.</Text>;

  return (
    <View>
      {occurrences.map((occurrence, index) => (
        <TouchableOpacity key={index} className="p-2 rounded-xl shadow-lg mb-3 bg-white">
          <View className="ml-2 flex-row items-center gap-x-4">
            <Feather name="alert-circle" size={28} color="#DC2626" />
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800">{occurrence.title}</Text>
              <Text className="text-base text-gray-600 mt-1">{occurrence.description}</Text>
              <Text className="text-xs text-gray-500 mt-1">{formatDate(occurrence.createdAt)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
