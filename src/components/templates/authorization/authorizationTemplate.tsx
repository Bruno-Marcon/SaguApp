import { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { studentService } from '@//services/studentes/studentsServices';
import { Authorization } from '../../../../types/authorizations';
import { StudentListItem } from '../../../../types/students';
import AuthorizationCard from '../../molecules/card/authorizationCard';
import { AuthorizationHeader } from '../../organisms/header/authorizationHeaderOrganism';
import GenericFilters from '../../organisms/filter/genericFilter';
import { authorizationService } from '@//services/authorizations/authorizationsService';

type Props = {
  refreshing: boolean;
  onRefreshEnd: () => void;
};

type Option = {
  label: string;
  value: string;
};

export default function AuthorizationTemplate({ refreshing, onRefreshEnd }: Props) {
  const [allAuthorizations, setAllAuthorizations] = useState<Authorization[]>([]);
  const [filteredAuthorizations, setFilteredAuthorizations] = useState<Authorization[]>([]);
  const [loading, setLoading] = useState(false);

  const [studentId, setStudentId] = useState('Todos');
  const [status, setStatus] = useState('Todos');
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  const [studentOptions, setStudentOptions] = useState<Option[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authorizationService.getAll({
        student_id: studentId !== 'Todos' ? studentId : undefined,
      });
      setAllAuthorizations(response.data);
    } catch (err) {
      console.error('Erro ao buscar autorizações:', err);
    }
    setLoading(false);
    onRefreshEnd();
  }, [studentId]);

  const loadStudents = async () => {
    try {
      const res = await studentService.getAll();
      const options: Option[] = res.data.map((student: StudentListItem) => ({
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
    let filtered = [...allAuthorizations];

    const statusMap: Record<string, string> = {
      'Pendente': 'pending',
      'Aprovada': 'approved',
      'Recusada': 'refuse',
    };

    if (status !== 'Todos') {
      filtered = filtered.filter(a => a.attributes.status === statusMap[status]);
    }

    if (dateRange.start && dateRange.end) {
      const start = new Date(dateRange.start).setHours(0, 0, 0, 0);
      const end = new Date(dateRange.end).setHours(23, 59, 59, 999);

      filtered = filtered.filter(a => {
        const createdAt = new Date(a.attributes.created_at).getTime();
        return createdAt >= start && createdAt <= end;
      });
    }

    filtered.sort((a, b) =>
      new Date(b.attributes.created_at).getTime() - new Date(a.attributes.created_at).getTime()
    );

    setFilteredAuthorizations(filtered);
  }, [allAuthorizations, status, dateRange]);

  return (
    <View className="flex-1 bg-gray-50">
      <AuthorizationHeader title="Autorizações" />

      <ScrollView className="px-4 pt-2" contentContainerStyle={{ paddingBottom: 40 }}>
        <GenericFilters
          status={{
            value: status,
            onChange: setStatus,
            options: [
              { label: 'Todos', value: 'Todos' },
              { label: 'Pendente', value: 'Pendente' },
              { label: 'Aprovada', value: 'Aprovada' },
              { label: 'Recusada', value: 'Recusada' },
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
          <ActivityIndicator size="large" color="#3B82F6" className="my-6" />
        ) : filteredAuthorizations.length === 0 ? (
          <Text className="text-center text-gray-500 mt-4">Nenhuma autorização encontrada.</Text>
        ) : (
          filteredAuthorizations.map((auth) => (
            <AuthorizationCard key={auth.id} authorization={auth} />
          ))
        )}
      </ScrollView>
    </View>
  );
}
