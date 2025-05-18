import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Occurrence } from '../../../../types/occurrence';
import { occurrenceService } from '@//services/occurrence/occurrenceService';
import { studentService } from '@//services/studentes/studentsServices';
import { StudentListItem } from '../../../../types/students';
import OccurrenceCard from '../../organisms/card/occurrenceCardOrganism';
import { OccurrenceHeader } from '../../organisms/header/occurrencesHeader';
import GenericFilters from '../../organisms/filter/genericFilter';

type Option = {
  label: string;
  value: string;
};

type Props = {
  refreshing: boolean;
  onRefreshEnd: () => void;
};

export default function OccurrenceTemplate({ refreshing, onRefreshEnd }: Props) {
  const [allOccurrences, setAllOccurrences] = useState<Occurrence[]>([]);
  const [filteredOccurrences, setFilteredOccurrences] = useState<Occurrence[]>([]);
  const [loading, setLoading] = useState(false);

  const [studentId, setStudentId] = useState('Todos');
  const [status, setStatus] = useState('Todos');
  const [severity, setSeverity] = useState('Todos');
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  const [studentOptions, setStudentOptions] = useState<Option[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await occurrenceService.getAll({
        student_id: studentId !== 'Todos' ? studentId : undefined,
      });
      setAllOccurrences(response.data);
    } catch (err) {
      console.error('Erro ao buscar ocorrências:', err);
    }
    setLoading(false);
    onRefreshEnd();
  };

  const loadStudents = async () => {
    try {
      const res = await studentService.getAll();
      const options = res.data.map((student: StudentListItem) => ({
        label: student.attributes.name,
        value: student.id,
      }));
      setStudentOptions([{ label: 'Todos', value: 'Todos' }, ...options]);
    } catch (err) {
      console.error('Erro ao carregar estudantes:', err);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    fetchData();
  }, [studentId]);

  useEffect(() => {
    if (refreshing) fetchData();
  }, [refreshing]);

  useEffect(() => {
    let filtered = [...allOccurrences];

    const statusMap: Record<string, string> = {
      'Aberta': 'open',
      'Em andamento': 'in_progress',
      'Resolvida': 'resolved',
    };

    const severityMap: Record<string, string> = {
      'Alta': 'high',
      'Média': 'medium',
      'Baixa': 'low',
    };

    if (status !== 'Todos') {
      filtered = filtered.filter(o => o.status === statusMap[status]);
    }

    if (severity !== 'Todos') {
      filtered = filtered.filter(o => o.severity === severityMap[severity]);
    }

    if (dateRange.start && dateRange.end) {
      const start = new Date(dateRange.start).setHours(0, 0, 0, 0);
      const end = new Date(dateRange.end).setHours(23, 59, 59, 999);
      filtered = filtered.filter(o => {
        const createdAt = new Date(o.created_at).getTime();
        return createdAt >= start && createdAt <= end;
      });
    }

    filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    setFilteredOccurrences(filtered);
  }, [allOccurrences, status, severity, dateRange]);

  return (
    <View className="flex-1 bg-gray-50">
      <OccurrenceHeader title="Ocorrências" />

      <GenericFilters
      status={{
        value: status,
        onChange: setStatus,
        options: [
          { label: 'Todos', value: 'Todos' },
          { label: 'Aberta', value: 'Aberta' },
          { label: 'Em andamento', value: 'Em andamento' },
          { label: 'Resolvida', value: 'Resolvida' },
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

      {loading ? (
        <ActivityIndicator size="large" color="#0E7C4A" className="my-4" />
      ) : filteredOccurrences.length > 0 ? (
        filteredOccurrences.map(occ => <OccurrenceCard key={occ.id} occurrence={occ} />)
      ) : (
        <Text className="text-center text-gray-500 mt-4">Nenhuma ocorrência encontrada.</Text>
      )}
    </View>
  );
}
