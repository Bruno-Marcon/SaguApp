import { View, TouchableOpacity, Text, Modal, ScrollView } from 'react-native';
import { formatDate } from '@//utils/dateUtils';
import { Occurrence, updateOccurrencePayload } from '../../../../../types/occurrence';
import { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { userService } from '@//services/userService';
import { User } from '../../../../../types/user';
import { showToast } from '@//utils/toastUtiles';

interface Props {
  occurrence: Occurrence & {
    student_name?: string;
    responsible_name?: string;
    relator_name?: string;
  };
  onUpdate: (id: string, newData: updateOccurrencePayload) => Promise<void>;
}

export default function OccurrenceDetailsSection({ occurrence, onUpdate }: Props) {
  const [isPrivate, setIsPrivate] = useState<boolean>(occurrence.attributes.private ?? false);
  const [responsibleId, setResponsibleId] = useState<string>(
    occurrence.relationships?.responsible?.data?.id ?? ''
  );
  const [responsibleName, setResponsibleName] = useState<string>(occurrence.responsible_name ?? '-');
  const [responsibleOptions, setResponsibleOptions] = useState<User[]>([]);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showResponsibleModal, setShowResponsibleModal] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      await onUpdate(occurrence.id, {
        responsible_id: responsibleId,
        status: occurrence.attributes.status,
        kind: occurrence.attributes.kind,
        severity: occurrence.attributes.severity,
      });
      showToast.success('Alterações salvas com sucesso!');
    } catch (err) {
      console.error('Erro ao salvar alterações', err);
      showToast.error('Erro ao salvar alterações.');
    }
  };

  const handleEditOrSubmit = async () => {
    if (isEditing) {
      await handleSubmit();
      setIsEditing(false);
    } else {
      await loadResponsibles();
      setIsEditing(true);
    }
  };

  const loadResponsibles = async () => {
    try {
      const res = await userService.getResponsibles();
      setResponsibleOptions(res);
    } catch (err) {
      console.error('Erro ao carregar responsáveis', err);
    }
  };

  const handleSelectResponsible = (id: string, name: string) => {
    setResponsibleId(id);
    setResponsibleName(name);
    setShowResponsibleModal(false);
  };

  const renderRow = (label: string, value: string | React.ReactNode) => (
    <View className="flex-row justify-between items-center border-b border-gray-100 py-3">
      <Text className="text-sm text-gray-500">{label}</Text>
      <Text className="text-sm text-gray-800 font-medium max-w-[65%] text-right">{value}</Text>
    </View>
  );

  return (
    <View className="border border-gray-200 rounded-2xl p-4 mb-4 bg-white">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-semibold text-gray-800">Detalhes da Ocorrência</Text>
        <TouchableOpacity onPress={handleEditOrSubmit}>
          <Feather name={isEditing ? 'check' : 'edit-2'} size={18} color="#374151" />
        </TouchableOpacity>
      </View>

      {renderRow('Estudante', occurrence.student_name ?? '-')}

      <View className="flex-row justify-between items-center border-b border-gray-100 py-3">
        <Text className="text-sm text-gray-500">Responsável</Text>
        {isEditing ? (
          <TouchableOpacity
            onPress={() => setShowResponsibleModal(true)}
            className="border border-gray-300 rounded-xl px-3 py-2 bg-white"
          >
            <Text className="text-gray-700 max-w-[65%]">{responsibleName}</Text>
          </TouchableOpacity>
        ) : (
          <Text className="text-sm text-gray-800 font-medium max-w-[65%] text-right">
            {responsibleName}
          </Text>
        )}
      </View>

      {renderRow('Relator', occurrence.relator_name ?? '-')}
      {renderRow(
        'Criado em',
        occurrence.attributes.created_at ? formatDate(occurrence.attributes.created_at) : '-'
      )}

      <View className="flex-row justify-between items-center border-b border-gray-100 py-3">
        <Text className="text-sm text-gray-500">Privacidade</Text>
        {isEditing ? (
          <TouchableOpacity
            onPress={() => setIsPrivate((prev) => !prev)}
            className={`px-4 py-1 rounded-full ${
              isPrivate ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            <Text className="text-white">{isPrivate ? 'Fechada' : 'Aberta'}</Text>
          </TouchableOpacity>
        ) : (
          <Text className="text-sm text-gray-800 font-medium max-w-[65%] text-right">
            {isPrivate ? 'Fechada' : 'Aberta'}
          </Text>
        )}
      </View>

      {renderRow('Descrição', occurrence.attributes.description ?? '-')}

      <Modal
        visible={showResponsibleModal}
        animationType="slide"
        transparent
        onShow={loadResponsibles}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-5 max-h-[70%]">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-semibold text-gray-800">Selecionar Responsável</Text>
              <TouchableOpacity onPress={() => setShowResponsibleModal(false)}>
                <Feather name="x" size={24} color="#374151" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              {responsibleOptions.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleSelectResponsible(item.id, item.name)}
                  className={`px-4 py-3 rounded-xl mb-2 ${
                    responsibleId === item.id ? 'bg-blue-600' : 'bg-gray-100'
                  }`}
                >
                  <Text
                    className={`${
                      responsibleId === item.id ? 'text-white' : 'text-gray-700'
                    } text-sm font-medium`}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
