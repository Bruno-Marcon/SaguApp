import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import OccurrenceModalHeader from '../../molecules/header/occurrenceModalHeader';
import TagGroup from '../../molecules/badge/tagGroup';
import { Authorization } from '../../../../types/authorizations';
import { authorizationService } from '@//services/authorizations/authorizationsService';
import { studentService } from '@//services/studentes/studentsServices';
import { IncludedUser } from '../../../../types/share';
import AuthorizationDetailsSection from '../../molecules/section/authorization/authorizationModalSection';
import { showToast } from '@//utils/toastUtiles';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
  visible: boolean;
  onClose: () => void;
  authorizationId: string | null;
  authorization?: Authorization | null;
  onSave?: () => void;
  onUpdate?: (id: string, newStatus: StatusOption) => void;
}

type StatusOption = 'approved' | 'refused';

export default function AuthorizationModal({
  visible,
  onClose,
  authorizationId,
  authorization: initialAuthorization,
  onSave,
  onUpdate,
}: Props) {
  const [authorization, setAuthorization] = useState<Authorization | null>(initialAuthorization ?? null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState<StatusOption>('approved');
  const [studentName, setStudentName] = useState('---');
  const [responsibleName, setResponsibleName] = useState('---');

  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const statusOptions: { label: string; value: StatusOption; color: string }[] = [
    { label: 'Aprovar', value: 'approved', color: 'bg-green-600' },
    { label: 'Recusar', value: 'refused', color: 'bg-red-500' },
  ];

  useEffect(() => {
    if (!visible || !authorizationId) return;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const authData = await authorizationService.getById(authorizationId);
        setAuthorization(authData.data);

        const studentId = authData.data.relationships.student?.data?.id;
        if (studentId) {
          const studentData = await studentService.getById(studentId);
          setStudentName(studentData.data.attributes.name);

          const parent = studentData.included?.find(
            (item) => item.type === 'parent' || item.type === 'user'
          ) as IncludedUser | undefined;

          if (parent?.attributes?.name) {
            setResponsibleName(parent.attributes.name);
          }
        }

        const currentStatus = authData.data.attributes.status as StatusOption;
        if (['approved', 'refused'].includes(currentStatus)) {
          setSelectedStatus(currentStatus);
        } else {
          setSelectedStatus('approved');
        }

        setDescription(authData.data.attributes.description);
        setDate(new Date(authData.data.attributes.date));
      } catch (err) {
        console.error('Erro ao buscar detalhes da autorização:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [visible, authorizationId]);

  const handleStatusUpdate = async () => {
    if (!authorization) return;
    setUpdating(true);
    try {
      await authorizationService.update(authorization.id, {
        status: selectedStatus,
        description,
        date: date.toISOString().split('T')[0],
      });

      showToast.success('Autorização atualizada com sucesso!');
      onUpdate?.(authorization.id, selectedStatus);
      onSave?.();
      onClose();
    } catch (err) {
      console.error('Erro ao atualizar autorização:', err);
      showToast.error('Erro ao atualizar.');
    } finally {
      setUpdating(false);
    }
  };

  if (!visible || (loading && !authorization)) return null;

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <View className="flex-1 bg-black/60">
          <View className="flex-1 justify-end">
            <View className="bg-white rounded-t-3xl px-5 pt-5 pb-4 w-full max-h-[95%]">
              <OccurrenceModalHeader
                title="Editar Autorização"
                onClose={onClose}
              />

              <TagGroup
                status={authorization?.attributes.status}
                kind="autorização"
                severity={undefined}
              />

              <ScrollView className="mb-4">
                {authorization && (
                  <AuthorizationDetailsSection
                    authorization={authorization}
                    studentName={studentName}
                    responsibleName={responsibleName}
                  />
                )}

                {/* 🔥 Campo descrição */}
                <View className="mt-4">
                  <Text className="text-sm text-gray-700 mb-1 font-semibold">Descrição:</Text>
                  <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Digite a descrição"
                    className="border border-gray-300 rounded-xl px-4 py-3 text-gray-700"
                  />
                </View>

                {/* 🔥 Campo data */}
                <View className="mt-4">
                  <Text className="text-sm text-gray-700 mb-1 font-semibold">Data:</Text>
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    className="border border-gray-300 rounded-xl px-4 py-3"
                  >
                    <Text className="text-gray-700">{date.toLocaleDateString()}</Text>
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

                {/* 🔥 Alterar Status com Chips */}
                <View className="mt-4">
                  <Text className="text-sm font-semibold text-gray-700 mb-2">Alterar Status:</Text>
                  <View className="flex-row gap-2">
                    {statusOptions.map((option) => (
                      <TouchableOpacity
                        key={option.value}
                        onPress={() => setSelectedStatus(option.value)}
                        className={`px-4 py-2 rounded-full ${
                          selectedStatus === option.value ? option.color : 'bg-gray-200'
                        }`}
                      >
                        <Text
                          className={`text-sm ${
                            selectedStatus === option.value ? 'text-white' : 'text-gray-700'
                          }`}
                        >
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </ScrollView>

              <TouchableOpacity
                onPress={handleStatusUpdate}
                disabled={updating}
                className="bg-green-600 mt-2 py-3 rounded-xl"
              >
                <Text className="text-white font-semibold text-center">
                  {updating ? 'Salvando...' : 'Salvar Alterações'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
