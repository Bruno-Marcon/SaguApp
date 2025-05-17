import React from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface OccurrenceDetailModalProps {
  visible: boolean;
  onClose: () => void;
  occurrence: {
    title: string;
    description: string;
    student: string;
    responsible: string;
    relator: string;
    createdAt: string;
    status: string;
    kind: string;
    severity: string;
    privacy: string;
    history: string[];
  };
}

export default function OccurrenceDetailModal({
  visible,
  onClose,
  occurrence,
}: OccurrenceDetailModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View className="flex-1 bg-black/60 justify-center items-center px-4">
        <View className="bg-white rounded-3xl p-5 w-full max-h-[90%]">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">{occurrence.title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color="#4B5563" />
            </TouchableOpacity>
          </View>

          {/* Status tags */}
          <View className="flex-row flex-wrap gap-2 mb-4">
            <Text className="px-2 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800">
              {occurrence.status}
            </Text>
            <Text className="px-2 py-1 text-xs font-bold rounded-full bg-yellow-100 text-yellow-800">
              {occurrence.kind}
            </Text>
            <Text className="px-2 py-1 text-xs font-bold rounded-full bg-red-100 text-red-800">
              {occurrence.severity}
            </Text>
          </View>

          <ScrollView className="mb-4">
            {/* Info grid */}
            <View className="border border-gray-200 rounded-xl p-4 space-y-2 mb-4">
              <View className="flex-row justify-between">
                <Text className="text-gray-500">Estudante</Text>
                <Text className="font-medium">{occurrence.student}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-500">Responsável</Text>
                <Text className="font-medium">{occurrence.responsible}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-500">Relator</Text>
                <Text className="font-medium">{occurrence.relator}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-500">Criado em</Text>
                <Text className="font-medium">{occurrence.createdAt}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-500">Privacidade</Text>
                <Text className="font-medium">{occurrence.privacy}</Text>
              </View>
            </View>

            {/* Histórico */}
            <Text className="text-base font-semibold text-gray-700 mb-2">Histórico e Comentários</Text>
            {occurrence.history.map((h, index) => (
              <View key={index} className="bg-gray-50 border border-green-200 p-3 rounded-lg mb-2">
                <Text className="text-sm text-green-700">{h}</Text>
              </View>
            ))}

            {/* Comentário */}
            <TextInput
              placeholder="Adicionar comentário..."
              multiline
              className="mt-2 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-800"
              style={{ minHeight: 80 }}
            />
          </ScrollView>

          {/* Botão de envio */}
          <TouchableOpacity className="bg-green-600 mt-2 py-3 rounded-xl">
            <Text className="text-white font-semibold text-center">Enviar Comentário</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
