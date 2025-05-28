import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { studentService } from '@//services/studentes/studentsServices';

type StudentOption = {
  id: string;
  name: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (data: {
    aluno: string;
    status: string;
    descricao: string;
    kind: string;
    severity: string;
    responsible_id?: string;
  }) => void;
};

const kindOptions = ['Comportamento', 'Disciplina', 'Pedagógico', 'Outro'];
const severityOptions = ['Baixa', 'Média', 'Alta'];

export function CreateOccurrenceModal({ visible, onClose, onSave }: Props) {
  const [search, setSearch] = useState('');
  const [selectedAlunoId, setSelectedAlunoId] = useState('');
  const [responsibleId, setResponsibleId] = useState('');
  const [descricaoComplement, setDescricaoComplement] = useState('');
  const [selectedKind, setSelectedKind] = useState(kindOptions[0]);
  const [selectedSeverity, setSelectedSeverity] = useState(severityOptions[1]);

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
        const filtered = res.data
        .filter((student) =>
            student.attributes.name.toLowerCase().includes(query.toLowerCase())
        )
        .map((student) => ({
            id: student.id,
            name: student.attributes.name,
        }));
        setStudents(filtered);
    } catch (err) {
        console.error('Erro ao buscar alunos:', err);
    }
    setLoading(false);
    };

  const handleSelectAluno = async (student: StudentOption) => {
    setSearch(student.name);
    setSelectedAlunoId(student.id);
    setStudents([]);

    try {
      const res = await studentService.getById(student.id);
      const parentId = res.data.relationships.parent?.data?.id;
      setResponsibleId(parentId || '');
    } catch (error) {
      console.error('Erro ao buscar parent do aluno:', error);
      setResponsibleId('');
    }
  };

  const handleSave = () => {
    if (!selectedAlunoId) return;

    const fullDescription = descricaoComplement || selectedKind;

    onSave({
      aluno: selectedAlunoId,
      status: 'open',
      descricao: fullDescription,
      kind: selectedKind.toLowerCase(),
      severity: selectedSeverity.toLowerCase(),
      responsible_id: responsibleId || undefined,
    });

    setSearch('');
    setDescricaoComplement('');
    setSelectedAlunoId('');
    setSelectedKind(kindOptions[0]);
    setSelectedSeverity(severityOptions[1]);
    setResponsibleId('');
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View className="flex-1 justify-end bg-black/40">
        <View className="bg-white dark:bg-neutral-900 rounded-t-3xl p-6 pb-10 shadow-lg">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-xl font-semibold text-gray-800 dark:text-white">
              Nova Ocorrência
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color="#374151" />
            </TouchableOpacity>
          </View>

          {/* Campo Aluno */}
          <View className="mb-4 relative">
            <Text className="text-sm text-gray-600 dark:text-gray-300 mb-2">Aluno</Text>
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
                    className="px-4 py-2 border-b border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                  >
                    <Text className="text-gray-700 dark:text-white">{item.name}</Text>
                  </TouchableOpacity>
                )}
                className="max-h-44 absolute top-20 w-full border border-gray-200 dark:border-neutral-700 rounded-xl shadow-sm bg-white dark:bg-neutral-800 z-20"
              />
            )}
          </View>

          {/* Tipo da Ocorrência */}
          <View className="mb-4">
            <Text className="text-sm text-gray-600 dark:text-gray-300 mb-2">Tipo da Ocorrência</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {kindOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => setSelectedKind(option)}
                  className={`px-4 py-2 rounded-full mr-3 ${
                    selectedKind === option ? 'bg-blue-500' : 'bg-gray-200 dark:bg-neutral-700'
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      selectedKind === option ? 'text-white' : 'text-gray-600 dark:text-gray-200'
                    }`}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Gravidade */}
          <View className="mb-4">
            <Text className="text-sm text-gray-600 dark:text-gray-300 mb-2">Gravidade</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {severityOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => setSelectedSeverity(option)}
                  className={`px-4 py-2 rounded-full mr-3 ${
                    selectedSeverity === option ? 'bg-red-500' : 'bg-gray-200 dark:bg-neutral-700'
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      selectedSeverity === option ? 'text-white' : 'text-gray-600 dark:text-gray-200'
                    }`}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Descrição */}
          <View className="mb-6">
            <Text className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Descrição detalhada
            </Text>
            <TextInput
              value={descricaoComplement}
              onChangeText={setDescricaoComplement}
              placeholder="Mais detalhes, se necessário"
              placeholderTextColor="#9CA3AF"
              multiline
              className="border border-gray-300 dark:border-neutral-700 rounded-xl px-4 py-3 h-24 text-gray-700 dark:text-white bg-white dark:bg-neutral-800"
            />
          </View>

          {/* Botão salvar */}
          <TouchableOpacity
            onPress={handleSave}
            className="bg-green-500 rounded-xl py-4 items-center shadow-sm"
          >
            <Text className="text-white font-bold text-base">Salvar Ocorrência</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
