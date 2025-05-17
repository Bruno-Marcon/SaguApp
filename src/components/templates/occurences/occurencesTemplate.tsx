import { useEffect, useMemo, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import TemplateScreen from '../../../components/templates/scrollView/templateScreen';
import { OccurrencesHeader } from '../../organisms/header/occurrencesHeader';
import OccurrencesList from '../../organisms/list/occurencesList';
import { useRouter } from 'expo-router';
import { Occurrence } from '../../../../types/occurrence';
import { occurrenceService } from '@//services/occurrence/occurrenceService';
import { Feather } from '@expo/vector-icons';

export default function OccurrencesTemplate() {
  const router = useRouter();
  const [classFilter, setClassFilter] = useState<string>('Todos');
  const [yearFilter, setYearFilter] = useState<string>('2024');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');
  const [studentFilter, setStudentFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const filters = useMemo(() => ({
    status: statusFilter === 'Todos' ? undefined : statusFilter,
    student_id: studentFilter || undefined,
    year: yearFilter,
    classId: classFilter === 'Todos' ? undefined : classFilter,
    date_range: dateFilter || undefined,
  }), [statusFilter, studentFilter, yearFilter, classFilter, dateFilter]);

  useEffect(() => {
    const fetchOccurrences = async () => {
      try {
        const response = await occurrenceService.getAll(filters);
        setOccurrences(response.data);
      } catch (error) {
        console.error('Erro ao buscar ocorrências:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOccurrences();
  }, [filters]);

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <TemplateScreen withHeader={false}>
      <ScrollView className="flex-1 px-4 pt-12 bg-white">
        {/* Área de filtros com visual inspirado na home */}
        <View className="bg-white rounded-2xl px-4 py-4 shadow-sm border border-gray-100 mb-4">
          <OccurrencesHeader
            showBackButton={true}
            onBackPress={handleBackPress}
            classValue={classFilter}
            yearValue={yearFilter}
            statusValue={statusFilter}
            onClassChange={setClassFilter}
            onYearChange={setYearFilter}
            onStatusChange={setStatusFilter}
            onStudentChange={setStudentFilter}
            onDateChange={setDateFilter}
          />
        </View>

        {/* Lista com cards modernos */}
        <OccurrencesList occurrences={occurrences} loading={loading} />
      </ScrollView>
    </TemplateScreen>
  );
}
