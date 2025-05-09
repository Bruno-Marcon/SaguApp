import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface OccurrenceDetailModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export default function OccurrenceDetailModal({
  visible,
  onClose,
  title,
  description
}: OccurrenceDetailModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/60 px-6">
        <View
          className="w-full bg-white p-6"
          style={{
            borderRadius: 16, // Borda redonda
            shadowColor: '#000', // Cor da sombra
            shadowOffset: { width: 0, height: 4 }, // Deslocamento da sombra
            shadowOpacity: 0.1, // Opacidade da sombra
            shadowRadius: 8, // Raio da sombra
            elevation: 6, // Para Android
          }}
        >
          <TouchableOpacity onPress={onClose} className="mb-4">
            <Feather name="arrow-left" size={24} color="#1F2937" />
          </TouchableOpacity>

          <Text className="text-2xl font-bold text-gray-800 mb-3">{title}</Text>
          <Text className="text-base text-gray-700">{description}</Text>
        </View>
      </View>
    </Modal>
  );
}
