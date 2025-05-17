import { useEffect, useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import TemplateScreen from '../../../components/templates/scrollView/templateScreen';
import { OccurrencesHeader } from '../../organisms/header/occurrencesHeader';
import OccurrencesList from '../../organisms/list/occurencesList';
import { useRouter } from 'expo-router';
import { Occurrence } from '../../../../types/occurrence';
import { occurrenceService } from '@//services/occurrence/occurrenceService';

export default function OccurrencesTemplate() {
  const router = useRouter();

  const [classFilter, setClassFilter] = useState<string>('Todos');
  const [yearFilter, setYearFilter] = useState<string>('2024');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');
  const [studentFilter, setStudentFilter] = useState<string>(''); // ✅ novo
  const [dateFilter, setDateFilter] = useState<string>(''); // ✅ novo

  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const filters = useMemo(() => {
    return {
      status: statusFilter === 'Todos' ? undefined : statusFilter,
      student_id: studentFilter || undefined,
      year: yearFilter,
      classId: classFilter === 'Todos' ? undefined : classFilter,
      date_range: dateFilter || undefined,
    };
  }, [statusFilter, studentFilter, yearFilter, classFilter, dateFilter]);

  useEffect(() => {
    const fetchOccurrences = async () => {
      try {
        const response = await occurrenceService.getAll(filters);
        console.log('[OCCURRENCES] Recebido:', response);
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
      <ScrollView className="flex-1 px-4 pt-4">
        <OccurrencesHeader
          showBackButton={true}
          onBackPress={handleBackPress}
          classValue={classFilter}
          yearValue={yearFilter}
          statusValue={statusFilter}
          onClassChange={setClassFilter}
          onYearChange={setYearFilter}
          onStatusChange={setStatusFilter}
          onStudentChange={setStudentFilter} // ✅
          onDateChange={setDateFilter}       // ✅
        />
        <OccurrencesList occurrences={occurrences} loading={loading} />
      </ScrollView>
    </TemplateScreen>
  );
}
