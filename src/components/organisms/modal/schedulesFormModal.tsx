import { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { scheduleService } from '@//services/schedules/schedulesService';
import { CreateSchedulePayload } from '../../../../types/schedules';
import { getUserInfo } from '@//storage/SecureUser';
import { showToast } from '@//utils/toastUtiles';
import OccurrenceModalHeader from '../../molecules/header/occurrenceModalHeader';

type Props = {
  visible: boolean;
  onClose: () => void;
  selectedDate: string;
  onRefresh: () => void;
  studentId: string;
};

const areaOptions = [
  'Psicologia',
  'Secretaria',
  'Coordenação',
  'Pedagogia',
  'Direção',
  'Orientação',
  'Outro',
];

export const ScheduleFormModal = ({
  visible,
  onClose,
  selectedDate,
  onRefresh,
  studentId,
}: Props) => {
  const [subject, setSubject] = useState('');
  const [area, setArea] = useState(areaOptions[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [date, setDate] = useState<Date>(new Date(selectedDate));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const fetchSlots = async () => {
      try {
        const user = await getUserInfo();
        if (!user?.id) {
          showToast.error('Relator não encontrado');
          return;
        }

        const res = await scheduleService.getAvailableSlots(
          selectedDate,
          user.id
        );

        setAvailableSlots(res.data.available_slots);
      } catch (error) {
        console.error('[SCHEDULE_MODAL] Erro ao buscar horários:', error);
        showToast.error('Erro ao buscar horários disponíveis');
      }
    };

    fetchSlots();
  }, [visible, selectedDate]);

  const handleSubmit = async () => {
    if (!subject || !area || !selectedSlot) {
      showToast.error('Preencha todos os campos!');
      return;
    }

    const payload: CreateSchedulePayload = {
      starts_at: `${selectedDate}T${selectedSlot}`,
      subject,
      area,
      status: 'waiting',
      student_id: studentId,
    };

    try {
      setLoading(true);
      await scheduleService.createSchedule(payload);
      showToast.success('Agendamento criado com sucesso!');
      onClose();
      onRefresh();
    } catch (error) {
      console.error('[SCHEDULE_MODAL] Erro ao criar agendamento:', error);
      showToast.error('Erro ao criar agendamento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <View className="flex-1 bg-black/60">
          <View className="flex-1 justify-end">
            <View className="bg-white dark:bg-neutral-900 rounded-t-3xl px-5 pt-5 pb-4 w-full max-h-[95%]">
              <OccurrenceModalHeader title="Novo Agendamento" onClose={onClose} />

              <ScrollView showsVerticalScrollIndicator={false}>
                {/* 🔥 Data */}
                <View className="mb-4">
                  <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Data:
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    className="border border-gray-300 dark:border-neutral-700 rounded-xl px-4 py-3 bg-white dark:bg-neutral-800"
                  >
                    <Text className="text-gray-700 dark:text-white">
                      {date.toLocaleDateString()}
                    </Text>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="default"
                      onChange={(_, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) setDate(selectedDate);
                      }}
                    />
                  )}
                </View>

                {/* 🔥 Horário */}
                <View className="mb-4">
                  <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Horário:
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {availableSlots.length === 0 ? (
                      <Text className="text-gray-500 dark:text-gray-400">
                        Nenhum horário disponível.
                      </Text>
                    ) : (
                      availableSlots.map((slot) => (
                        <TouchableOpacity
                          key={slot}
                          onPress={() => setSelectedSlot(slot)}
                          className={`px-4 py-2 rounded-full ${
                            selectedSlot === slot
                              ? 'bg-green-600'
                              : 'bg-gray-200 dark:bg-neutral-800'
                          }`}
                        >
                          <Text
                            className={`${
                              selectedSlot === slot
                                ? 'text-white'
                                : 'text-gray-700 dark:text-gray-200'
                            }`}
                          >
                            {slot}
                          </Text>
                        </TouchableOpacity>
                      ))
                    )}
                  </View>
                </View>

                {/* 🔥 Área */}
                <View className="mb-4">
                  <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Área:
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {areaOptions.map((option) => (
                      <TouchableOpacity
                        key={option}
                        onPress={() => setArea(option)}
                        className={`px-4 py-2 rounded-full ${
                          area === option
                            ? 'bg-blue-600'
                            : 'bg-gray-200 dark:bg-neutral-800'
                        }`}
                      >
                        <Text
                          className={`${
                            area === option
                              ? 'text-white'
                              : 'text-gray-700 dark:text-gray-200'
                          }`}
                        >
                          {option}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* 🔥 Assunto */}
                <View className="mb-4">
                  <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Assunto:
                  </Text>
                  <TextInput
                    value={subject}
                    onChangeText={setSubject}
                    placeholder="Digite o assunto"
                    placeholderTextColor="#9CA3AF"
                    className="border border-gray-300 dark:border-neutral-700 rounded-xl px-4 py-3 text-gray-700 dark:text-white bg-white dark:bg-neutral-800"
                  />
                </View>
              </ScrollView>

              {/* 🔥 Botão */}
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={loading}
                className="bg-green-600 mt-2 py-3 rounded-xl"
              >
                <Text className="text-white font-semibold text-center">
                  {loading ? 'Salvando...' : 'Criar Agendamento'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
