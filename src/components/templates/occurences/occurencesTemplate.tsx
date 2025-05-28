import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Occurrence, OccurrenceResponse } from '../../../../types/occurrence';
import { occurrenceService } from '@//services/occurrence/occurrenceService';
import OccurrenceCard from '../../organisms/card/occurrenceCardOrganism';
import { OccurrenceHeader } from '../../organisms/header/occurrencesHeader';
import GenericFilters from '../../organisms/filter/genericFilter';
import { IncludedEvent, IncludedStudent, IncludedUser } from '../../../../types/share';
import { StudentListItem } from '../../../../types/students';
import { studentService } from '@//services/studentes/studentsServices';
import Toast from 'react-native-toast-message';
import OccurrenceCardSkeleton from '../../Skeleton/occurrenceCardSkeleton';
import GenericFiltersSkeleton from '../../Skeleton/genericFilterSkeleton';
import { CreateOccurrenceModal } from '../../organisms/modal/createOccurrencesModal';

type Option = {
  label: string;
  value: string;
};

type Props = {
  refreshing: boolean;
  onRefreshEnd: () => void;
  onOccurrencePress: (
    occurrence: Occurrence & {
      student_name?: string;
      relator_name?: string;
      responsible_name?: string;
    }
  ) => void;
};

function getIncludedName(
  included: Array<IncludedUser | IncludedStudent | IncludedEvent> | undefined,
  type: string,
  id: string
): string {
  if (!included) return '';
  const found = included.find((item) => item.type === type && item.id === id);
  return found?.attributes?.name ?? '';
}

export default function OccurrenceTemplate({
  refreshing,
  onRefreshEnd,
  onOccurrencePress,
}: Props) {
  const [allOccurrences, setAllOccurrences] = useState<
    (Occurrence & {
      student_name?: string;
      relator_name?: string;
      responsible_name?: string;
    })[]
  >([]);
  const [filteredOccurrences, setFilteredOccurrences] = useState<typeof allOccurrences>([]);
  const [loading, setLoading] = useState(false);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [studentId, setStudentId] = useState('Todos');
  const [status, setStatus] = useState('Todos');
  const [severity, setSeverity] = useState('Todos');
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  const [studentOptions, setStudentOptions] = useState<Option[]>([]);

  const loadStudents = async () => {
    if (studentsLoading) return;
    setStudentsLoading(true);
    try {
      const res = await studentService.getAll(1);
      const options = res.data.map((student: StudentListItem) => ({
        label: student.attributes.name,
        value: student.id,
      }));
      setStudentOptions([{ label: 'Todos', value: 'Todos' }, ...options]);
    } catch (err: any) {
      console.error('Erro ao carregar estudantes:', err);
      Toast.show({ type: 'error', text1: 'Erro ao carregar estudantes' });
    } finally {
      setStudentsLoading(false);
    }
  };

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response: OccurrenceResponse & {
        included?: Array<IncludedUser | IncludedStudent | IncludedEvent>;
      } = await occurrenceService.getOccurrencies({});

      const occurrencesWithNames = response.data.map((occ) => {
        const studentId = occ.relationships.student.data.id;
        const relatorId = occ.relationships.relator.data.id;
        const responsibleId = occ.relationships.responsible.data.id;

        return {
          ...occ,
          student_name: getIncludedName(response.included, 'student', studentId),
          relator_name: getIncludedName(response.included, 'user', relatorId),
          responsible_name: getIncludedName(response.included, 'user', responsibleId),
        };
      });

      setAllOccurrences(occurrencesWithNames);
    } catch (err: any) {
      console.error('Erro ao buscar ocorrências:', err);
      Toast.show({ type: 'error', text1: 'Erro ao buscar ocorrências' });
    } finally {
      setLoading(false);
      onRefreshEnd();
    }
  };

  useEffect(() => {
    loadStudents();
    fetchData();
  }, []);

  useEffect(() => {
    if (refreshing) fetchData();
  }, [refreshing]);

  useEffect(() => {
    let filtered = [...allOccurrences];

    if (studentId !== 'Todos') {
      filtered = filtered.filter((occ) => occ.relationships.student.data.id === studentId);
    }

    if (status !== 'Todos') {
      const statusMapBackendToUI: Record<string, string> = {
        open: 'Aberta',
        in_progress: 'Em andamento',
        resolved: 'Resolvida',
        closed: 'Fechada',
      };
      filtered = filtered.filter(
        (occ) => statusMapBackendToUI[occ.attributes.status] === status
      );
    }

    if (severity !== 'Todos') {
      const severityMapBackendToUI: Record<string, string> = {
        low: 'Baixa',
        normal: 'Média',
        medium: 'Média',
        high: 'Alta',
      };
      filtered = filtered.filter(
        (occ) => severityMapBackendToUI[occ.attributes.severity] === severity
      );
    }

    if (dateRange.start && dateRange.end) {
      const start = new Date(dateRange.start).setHours(0, 0, 0, 0);
      const end = new Date(dateRange.end).setHours(23, 59, 59, 999);

      filtered = filtered.filter((occ) => {
        const createdAtDate = new Date(occ.attributes.created_at);
        if (isNaN(createdAtDate.getTime())) return false;
        const createdAtTime = createdAtDate.getTime();
        return createdAtTime >= start && createdAtTime <= end;
      });
    }

    setFilteredOccurrences(filtered);
  }, [allOccurrences, studentId, status, severity, dateRange]);

  return (
    <View className="flex-1 bg-gray-50 dark:bg-neutral-950">
      <OccurrenceHeader title="Ocorrências" onCreatePress={() => setModalVisible(true)} />

      {studentsLoading ? (
        <GenericFiltersSkeleton />
      ) : (
        <GenericFilters
          status={{
            value: status,
            onChange: setStatus,
            options: [
              { label: 'Todos', value: 'Todos' },
              { label: 'Aberta', value: 'Aberta' },
              { label: 'Em andamento', value: 'Em andamento' },
              { label: 'Resolvida', value: 'Resolvida' },
              { label: 'Fechada', value: 'Fechada' },
            ],
          }}
          severity={{
            value: severity,
            onChange: setSeverity,
            options: [
              { label: 'Todos', value: 'Todos' },
              { label: 'Alta', value: 'Alta' },
              { label: 'Média', value: 'Média' },
              { label: 'Baixa', value: 'Baixa' },
            ],
          }}
          student={{
            value: studentId,
            onChange: setStudentId,
            options: studentOptions,
          }}
          dateRange={{
            start: dateRange.start,
            end: dateRange.end,
            onStartChange: (date) => setDateRange((prev) => ({ ...prev, start: date })),
            onEndChange: (date) => setDateRange((prev) => ({ ...prev, end: date })),
          }}
        />
      )}

      {loading ? (
        <>
          <OccurrenceCardSkeleton />
          <OccurrenceCardSkeleton />
          <OccurrenceCardSkeleton />
        </>
      ) : filteredOccurrences.length > 0 ? (
        filteredOccurrences.map((occ) => (
          <OccurrenceCard key={occ.id} occurrence={occ} onPress={() => onOccurrencePress(occ)} />
        ))
      ) : (
        <Text className="text-center text-gray-500 dark:text-gray-400 mt-4">
          Nenhuma ocorrência encontrada.
        </Text>
      )}

      {/* <CreateOccurrenceModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={async ({ aluno, status, descricao, kind, severity }) => {
          try {
            await occurrenceService.createOccurrence({
              student_id: aluno,
              responsible_id: '',
              title: descricao,
              description: descricao,
              kind,
              severity,
              status,
            });

            Toast.show({ type: 'success', text1: 'Ocorrência criada!' });
            setModalVisible(false);
            fetchData();
          } catch (err) {
            console.error(err);
            Toast.show({ type: 'error', text1: 'Erro ao criar ocorrência' });
          }
        }}
      /> */}
    </View>
  );
}
