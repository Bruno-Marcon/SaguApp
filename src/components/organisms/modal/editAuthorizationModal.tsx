import { View, Text, TextInput, Modal, TouchableOpacity, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { studentService } from '@//services/studentes/studentsServices';

type StudentOption = { id: string; name: string };

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (data: { aluno: string; status: string; descricao: string }) => void;
};

const descriptionOptions = [
  'Saída antecipada',
  'Consulta médica',
  'Outro',
];

export function EditAuthorizationModal({ visible, onClose, onSave }: Props) {
  const [search, setSearch] = useState('');
  const [selectedAlunoId, setSelectedAlunoId] = useState('');
  const [descricaoComplement, setDescricaoComplement] = useState('');
  const [selectedDescriptionOption, setSelectedDescriptionOption] = useState(descriptionOptions[0]);

  const [students, setStudents] = useState<StudentOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search.length > 2) {
      handleSearchStudent(search);
    } else {
      setStudents([]);
    }
  }, [search]);

  const handleSearchStudent = async (query: string) => {
    setLoading(true);
    try {
      const res = await studentService.getAll();
      const options = res.data
        .filter((student) =>
          student.attributes.name.toLowerCase().includes(query.toLowerCase())
        )
        .map((student) => ({
          id: student.id,
          name: student.attributes.name,
        }));

      setStudents(options);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSelectAluno = (student: StudentOption) => {
    setSearch(student.name);
    setSelectedAlunoId(student.id);
    setStudents([]);
  };

  const handleSave = () => {
    if (!selectedAlunoId) return;
    const fullDescription = descricaoComplement
      ? `${selectedDescriptionOption} - ${descricaoComplement}`
      : selectedDescriptionOption;

    onSave({ aluno: selectedAlunoId, status: 'pending', descricao: fullDescription });

    setSearch('');
    setDescricaoComplement('');
    setSelectedAlunoId('');
    setSelectedDescriptionOption(descriptionOptions[0]);
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View className="flex-1 justify-end bg-black/40">
        <View className="bg-white dark:bg-neutral-900 rounded-t-3xl p-6 pb-10 shadow-lg">

          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-xl font-semibold text-gray-800 dark:text-white">Nova Autorização</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color="#374151" />
            </TouchableOpacity>
          </View>

          {/* Campo Aluno */}
          <View className="mb-4 relative">
            <Text className="text-sm text-gray-600 mb-2">Aluno</Text>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Buscar aluno"
              placeholderTextColor="#9CA3AF"
              className="border border-gray-300 dark:border-neutral-700 rounded-xl px-4 py-3 text-gray-700 dark:text-white dark:bg-neutral-800"
            />
            {loading && <ActivityIndicator size="small" color="#3B82F6" className="mt-2" />}
            {students.length > 0 && (
              <FlatList
                data={students}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelectAluno(item)}
                    className="px-4 py-2 border-b border-gray-200 bg-white"
                  >
                    <Text className="text-gray-700">{item.name}</Text>
                  </TouchableOpacity>
                )}
                className="max-h-44 absolute top-20 w-full border border-gray-200 dark:border-neutral-700 rounded-xl shadow-sm bg-white dark:bg-neutral-800 z-20"
              />
            )}
          </View>

          {/* Motivo da autorização com chips */}
          <View className="mb-4">
            <Text className="text-sm text-gray-600 mb-2">Motivo da autorização</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {descriptionOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => setSelectedDescriptionOption(option)}
                  className={`px-4 py-2 rounded-full mr-3 ${
                    selectedDescriptionOption === option ? 'bg-blue-500' : 'bg-gray-200 dark:bg-neutral-700'
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      selectedDescriptionOption === option ? 'text-white' : 'text-gray-600 dark:text-gray-200'
                    }`}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Complemento */}
          <View className="mb-6">
            <Text className="text-sm text-gray-600 mb-2">Complemento (opcional)</Text>
            <TextInput
              value={descricaoComplement}
              onChangeText={setDescricaoComplement}
              placeholder="Mais detalhes, se necessário"
              multiline
              className="border border-gray-300 rounded-xl px-4 py-3 h-24 text-gray-700"
            />
          </View>

          {/* Botão salvar */}
          <TouchableOpacity
            onPress={handleSave}
            className="bg-green-500 rounded-xl py-4 items-center shadow-sm"
          >
            <Text className="text-white font-bold text-base">Salvar Autorização</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
