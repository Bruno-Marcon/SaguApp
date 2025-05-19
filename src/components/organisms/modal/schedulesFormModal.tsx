import { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { scheduleService } from '@//services/schedules/schedulesService';
import { Schedule, UpdateSchedulePayload } from '../../../../types/schedules';

type Props = {
  visible: boolean;
  onClose: () => void;
  selectedDate: string;
  onRefresh: () => void;
  existingSchedule?: Schedule;
};

export const ScheduleFormModal = ({
  visible,
  onClose,
  selectedDate,
  onRefresh,
  existingSchedule,
}: Props) => {
  const isEditing = !!existingSchedule;

  const [status, setStatus] = useState<'waiting' | 'confirmed'>('waiting');

  useEffect(() => {
    if (isEditing && existingSchedule) {
      setStatus(existingSchedule.attributes.status as 'waiting' | 'confirmed');
    } else {
      onClose(); // Se não estiver editando, fecha o modal automaticamente
    }
  }, [existingSchedule]);

  const handleSubmit = async () => {
    if (status !== 'confirmed') {
      Alert.alert('Aviso', 'Só é permitido confirmar o agendamento.');
      return;
    }

    const payload: UpdateSchedulePayload = { status };

    try {
      await scheduleService.updateSchedule(existingSchedule!.id, payload);
      Alert.alert('Sucesso', 'Agendamento confirmado!');
      onClose();
      onRefresh();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível confirmar o agendamento.');
      console.error('[SCHEDULE_MODAL] Erro ao confirmar agendamento:', error);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-4 rounded-xl w-[90%]">
          <Text className="text-lg font-bold mb-2">Confirmar agendamento</Text>

          <Text className="text-sm mb-1">Status:</Text>
          <View className="border border-gray-300 rounded-md mb-4">
            <Picker
              selectedValue={status}
              onValueChange={(value) => setStatus(value)}
              style={{ height: 40 }}
            >
              <Picker.Item label="Aguardando" value="waiting" />
              <Picker.Item label="Confirmado" value="confirmed" />
            </Picker>
          </View>

          <Text className="text-xs text-gray-500 mb-2">
            Apenas o status "Confirmado" é permitido para salvar.
          </Text>

          <View className="flex-row justify-end gap-4 mt-4">
            <TouchableOpacity onPress={onClose}>
              <Text className="text-red-500 font-medium">Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSubmit}>
              <Text className="text-green-600 font-medium">Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
