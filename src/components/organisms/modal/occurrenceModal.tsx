// Atualizado: OccurrenceModal.tsx com estilo moderno e acessibilidade
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Occurrence } from '../../../../types/occurrence';
import { formatDate } from '@//utils/dateUtils';

interface Props {
  visible: boolean;
  onClose: () => void;
  occurrence: Occurrence | null;
}

export default function OccurrenceModal({ visible, onClose, occurrence }: Props) {
  if (!occurrence) return null;

  const { title, description, created_at, status, kind, severity } = occurrence;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black/60 px-4">
        <View className="bg-white rounded-3xl w-full p-6 shadow-lg shadow-black/20">
          <TouchableOpacity
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Fechar modal"
            className="absolute top-4 right-4"
          >
            <Feather name="x" size={24} color="#6B7280" />
          </TouchableOpacity>

          <View className="mb-4">
            <Text className="text-2xl font-bold text-gray-900" accessibilityRole="header">
              {title}
            </Text>
            <View className="flex-row items-center mt-1 gap-x-1">
              <Feather name="calendar" size={14} color="#9CA3AF" />
              <Text className="text-sm text-gray-500">{formatDate(created_at)}</Text>
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-base text-gray-700 leading-relaxed">
              {description}
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-2">
            <Tag label={`Status: ${status ?? 'N/A'}`} color="orange" />
            <Tag label={`Gravidade: ${severity ?? 'N/A'}`} color="red" />
            <Tag label={`Tipo: ${kind ?? 'N/A'}`} color="blue" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

function Tag({ label, color }: { label: string; color: 'orange' | 'red' | 'blue' }) {
  const colors = {
    orange: { bg: 'bg-orange-100', text: 'text-orange-700' },
    red: { bg: 'bg-red-100', text: 'text-red-700' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-700' },
  }[color];

  return (
    <View className={`rounded-full px-3 py-1 ${colors.bg}`}>
      <Text className={`text-xs font-semibold ${colors.text}`}>{label}</Text>
    </View>
  );
}