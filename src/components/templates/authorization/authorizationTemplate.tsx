import { useEffect, useState, useMemo } from 'react';
import { ScrollView } from 'react-native';
import TemplateScreen from '../../../components/templates/scrollView/templateScreen';
import { useRouter } from 'expo-router';
import { AuthorizationsHeader } from '../../organisms/header/authorizationHeaderOrganism';
import AuthorizationsList from '../../organisms/list/authorizationListOrganism';
import { Authorization } from '../../../../types/authorizations';
import { authorizationService } from '@//services/authorizations/authorizationsService';


export default function AuthorizationsTemplate() {
  const router = useRouter();

  const [classFilter, setClassFilter] = useState<string>('Todos');
  const [yearFilter, setYearFilter] = useState<string>('2024');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');

  const [authorizations, setAuthorizations] = useState<Authorization[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const filters = useMemo(() => ({
    classId: classFilter === 'Todos' ? undefined : classFilter,
    year: yearFilter,
    status: statusFilter === 'Todos' ? undefined : statusFilter,
  }), [classFilter, yearFilter, statusFilter]);

  useEffect(() => {
    const fetchAuthorizations = async () => {
      setLoading(true);
      try {
        const response = await authorizationService.getAll();
        setAuthorizations(response.data);
      } catch (error) {
        console.error('Erro ao buscar autorizações:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorizations();
  }, []);

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
        <AuthorizationsHeader 
          showBackButton={true}
          onBackPress={handleBackPress}
          classValue={classFilter}
          yearValue={yearFilter}
          statusValue={statusFilter}
          onClassChange={setClassFilter}
          onYearChange={setYearFilter}
          onStatusChange={setStatusFilter}
        />
        <AuthorizationsList authorizations={authorizations} loading={loading} />
      </ScrollView>
    </TemplateScreen>
  );
}