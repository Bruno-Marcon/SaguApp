import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { formatDate } from "@//utils/dateUtils";

interface OccurrenceCardProps {
  title: string;
  description: string;
  createdAt?: Date | string;
  authorName?: string;
  isNew?: boolean;
  category?: string;
  className?: string;
  onPress?: () => void;
}

export default function OccurrenceCardAtom({
  title,
  description,
  createdAt,
  authorName,
  isNew = false,
  category,
  className = "mb-3 bg-white rounded-xl shadow-sm",
  onPress
}: OccurrenceCardProps) {
  const today = new Date();
  const formattedTime = createdAt ? formatDate(createdAt) : `Today at ${today.getHours()}:${today.getMinutes().toString().padStart(2, '0')}`;
  
  return (
    <TouchableOpacity 
      onPress={onPress} 
      className={className}
      activeOpacity={0.7}
    >
      <View className="p-3 flex-row items-start">
        <View className="mr-3 mt-1">
          <Feather name="alert-triangle" size={20} color="#F59E0B" />
        </View>
        
        <View className="flex-1">
          <View className="flex-row items-center flex-wrap mb-1">
            <Text className="text-base font-semibold text-gray-800 mr-2">{title}</Text>
            {isNew && (
              <View className="bg-orange-100 px-2 py-0.5 rounded-full">
                <Text className="text-xs font-medium text-orange-600">New</Text>
              </View>
            )}
          </View>
          
          <Text className="text-sm text-gray-600 mb-2" numberOfLines={2}>
            {description}
          </Text>
          
          <View className="flex-row justify-between items-center mt-1">
            <View className="flex-row items-center">
              {authorName && (
                <Text className="text-xs text-gray-500 mr-2">{authorName}</Text>
              )}
              
              {category && (
                <View className="bg-blue-100 px-2 py-0.5 rounded-full">
                  <Text className="text-xs font-medium text-blue-600">{category}</Text>
                </View>
              )}
            </View>
            
            <Text className="text-xs text-gray-400">{formattedTime}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}