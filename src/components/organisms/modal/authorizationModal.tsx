import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';

import OccurrenceModalHeader from '../../molecules/header/occurrenceModalHeader';
import TagGroup from '../../molecules/badge/tagGroup';
import { Authorization } from '../../../../types/authorizations';
import { authorizationService } from '@//services/authorizations/authorizationsService';
import { studentService } from '@//services/studentes/studentsServices';
import { IncludedUser } from '../../../../types/share';
import AuthorizationDetailsSection from '../../molecules/section/authorization/authorizationModalSection';

interface Props {
  visible: boolean;
  onClose: () => void;
  authorizationId: string | null;
  authorization?: Authorization | null;
  onSave?: () => void;
}

type StatusOption = 'pending' | 'approved' | 'refused';

export default function AuthorizationModal({
  visible,
  onClose,
  authorizationId,
  authorization: initialAuthorization,
  onSave,
}: Props) {
  const [authorization, setAuthorization] = useState<Authorization | null>(initialAuthorization ?? null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<StatusOption>('pending');
  const [studentName, setStudentName] = useState('---');
  const [responsibleName, setResponsibleName] = useState('---');

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

        setSelectedStatus(authData.data.attributes.status as StatusOption);
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
      await authorizationService.updateStatusViaPost(authorization, selectedStatus);
      onSave?.();
      onClose();
    } catch (err) {
      console.error('Erro ao salvar via POST:', err);
    } finally {
      setUpdating(false);
    }
  };

  const renderRadioOption = (label: string, value: StatusOption, color: string) => {
    const isSelected = selectedStatus === value;

    return (
      <TouchableOpacity
        key={value}
        onPress={() => setSelectedStatus(value)}
        className="flex-row items-center space-x-2 mb-2"
      >
        <View
          className="w-5 h-5 rounded-full border-2"
          style={{
            borderColor: color,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isSelected && (
            <View className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          )}
        </View>
        <Text className="text-gray-800">{label}</Text>
      </TouchableOpacity>
    );
  };

  if (!visible || (loading && !authorization)) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View className="flex-1 bg-black/60 justify-center items-center px-4">
        <View className="bg-white rounded-3xl p-5 w-full max-h-[90%]">
          <OccurrenceModalHeader
            title={authorization?.attributes.description ?? 'Autorização'}
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

            {/* ✅ Seletor de status */}
            <View className="mt-4 gap-y-2">
              <Text className="text-sm font-semibold text-gray-700 mb-2">Alterar Status:</Text>
              {renderRadioOption('Pendente', 'pending', '#FBBF24')}
              {renderRadioOption('Aprovada', 'approved', '#16A34A')}
              {renderRadioOption('Recusada', 'refused', '#EF4444')}
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
    </Modal>
  );
}
