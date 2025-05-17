import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ErrorMessage } from '../../atoms/indicators/errorMessage';
import Loading from '../../atoms/indicators/loadingAtom';
import TemplateScreen from '../scrollView/templateScreen';

import { getUserInfo } from '@//storage/SecureUser';
import { occurrenceService } from '@//services/occurrence/occurrenceService';
import { authorizationService } from '@//services/authorizations/authorizationsService';
import { statsService } from '@//services/dashBoard/stats';

import { Occurrence } from '../../../../types/occurrence';
import { Authorization } from '../../../../types/authorizations';
import { StatsData } from '../../../../types/stats';

import OccurrenceModal from '../../organisms/modal/occurrenceModal';
import { ApresentationSection } from '../../molecules/section/apresentation/apresentationSectionWithStatus';
import { SectionWithCarouselOccurences } from '../../organisms/carousel/sectionWithCarouselOccurencies';
import { SectionWithCarousel } from '../../organisms/carousel/sectionWithCarousel';

export const HomeScreen = () => {
  const [userData, setUserData] = useState<{ name: string } | null>(null);
  const [authorizationData, setAuthorizationData] = useState<Authorization[]>([]);
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
  const [selectedOccurrence, setSelectedOccurrence] = useState<Occurrence | null>(null);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [user, statsResponse, occurrencesResponse, authorizationsResponse] = await Promise.all([
          getUserInfo(),
          statsService.getStats(),
          occurrenceService.getAll(),
          authorizationService.getAll(),
        ]);

        setUserData(user);
        setStats(statsResponse);
        setOccurrences(occurrencesResponse.data);
        setAuthorizationData(authorizationsResponse.data);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const [user, statsResponse] = await Promise.all([
        getUserInfo(),
        statsService.getStats(),
      ]);

      setUserData(user);
      setStats(statsResponse);
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleOccurrencesPress = () => {
    router.push('/(panel)/occurences/occurences');
  };

  const handleAuthorizationPress = () => {
    router.push('/(panel)/authorization/page');
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={handleRefresh} />;
  if (!userData) return <ErrorMessage message="Dados do usuário não encontrados" onRetry={handleRefresh} />;

  return (
    <TemplateScreen withHeader>
      <ScrollView className="flex-1">
        <ApresentationSection
          name={`Olá, ${userData.name}`}
          subtitle="Seja bem-vindo ao Sagu App"
          statusCards={[
            {
              iconName: 'calendar',
              title: 'Agend.',
              subtitle: stats?.scheduled_appointments?.toString() || '...',
              iconColor: '#F59E0B',
            },
            {
              iconName: 'alert-circle',
              title: 'Ocorrências',
              subtitle: stats?.pending_occurrencies?.toString() || '...',
              iconColor: '#EF4444',
            },
            {
              iconName: 'edit',
              title: 'Orientações',
              subtitle: stats?.pending_orientations?.toString() || '...',
              iconColor: '#10B981',
            },
          ]}
        />

        <SectionWithCarouselOccurences
          data={occurrences}
          onPressLink={handleOccurrencesPress}
          onCardPress={setSelectedOccurrence} title={'Ocorrencias'} linkText={'Ver todos'}        />

        <SectionWithCarousel
          data={authorizationData.map((item) => ({ id: item.id, rawData: item }))}
          onPressLink={handleAuthorizationPress} title={'Autorizações'} linkText={'Ver todos'}        />
      </ScrollView>

      <OccurrenceModal
        visible={!!selectedOccurrence}
        occurrence={selectedOccurrence}
        onClose={() => setSelectedOccurrence(null)}
      />
    </TemplateScreen>
  );
};
