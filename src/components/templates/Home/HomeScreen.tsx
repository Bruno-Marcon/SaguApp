import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

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
import AuthorizationModal from '../../organisms/modal/authorizationModal';

import { ApresentationSection } from '../../molecules/section/apresentation/apresentationSectionWithStatus';
import { SectionOccurrences } from '../../organisms/carousel/SectionOccurrences';
import NewsCarousel from '../../molecules/section/news/newsCarrousel';
import { SectionAuthorization } from '../../organisms/carousel/sectionAuthorization';
import { SectionAcademicData } from '../../molecules/section/academic/sectionAcademicData';

export const HomeScreen = () => {
  const [userData, setUserData] = useState<{ id: string; name: string } | null>(null);
  const [authorizationData, setAuthorizationData] = useState<Authorization[]>([]);
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
  const [selectedOccurrence, setSelectedOccurrence] = useState<Occurrence | null>(null);
  const [selectedAuthorization, setSelectedAuthorization] = useState<Authorization | null>(null);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  const [authorizationLoading, setAuthorizationLoading] = useState(false);
  const [occurrenceLoading, setOccurrenceLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [user, statsResponse, occurrencesResponse, authorizationsResponse] = await Promise.all([
        getUserInfo(),
        statsService.getStats(),
        occurrenceService.getOccurrencies(),
        authorizationService.getAll(),
      ]);

      setUserData(user);
      setStats(statsResponse);
      setOccurrences(occurrencesResponse.data);
      setAuthorizationData(authorizationsResponse.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAuthorizationUpdate = async (id: string, newStatus: Authorization['attributes']['status']) => {
    setAuthorizationLoading(true);
    try {
      await authorizationService.updateStatus(id, newStatus);
      await fetchData();
      Toast.show({ type: 'success', text1: 'Status da autorização atualizado com sucesso!' });
    } catch (err: any) {
      Toast.show({ type: 'error', text1: 'Erro ao atualizar autorização', text2: err.message });
    } finally {
      setAuthorizationLoading(false);
    }
  };

  const handleOccurrenceUpdate = async () => {
    setOccurrenceLoading(true);
    try {
      await fetchData();
      Toast.show({ type: 'success', text1: 'Ocorrência atualizada com sucesso!' });
    } catch (err: any) {
      Toast.show({ type: 'error', text1: 'Erro ao atualizar ocorrência', text2: err.message });
    } finally {
      setOccurrenceLoading(false);
    }
  };

  const modalIsOpen = !!selectedOccurrence || !!selectedAuthorization;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={fetchData} />;
  if (!userData) return <ErrorMessage message="Dados do usuário não encontrados" onRetry={fetchData} />;

  return (
    <>
      <TemplateScreen withHeader scrollable={!modalIsOpen}>
        <View style={{ flex: 1 }} pointerEvents={modalIsOpen ? 'none' : 'auto'}>
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
          <SectionAcademicData />
          <NewsCarousel />

          <SectionOccurrences
            data={occurrences}
            loading={occurrenceLoading}
            onPressLink={() => router.push('/(panel)/occurences/occurences')}
            onCardPress={setSelectedOccurrence}
            title="Ocorrências Abertas"
            linkText="Ver todos"
          />

          <SectionAuthorization
            data={authorizationData.map((item) => ({ id: item.id, rawData: item }))}
            onPressLink={() => router.push('/(panel)/authorization/page')}
            onCardPress={setSelectedAuthorization}
            title="Autorizações Pendentes"
            linkText="Ver todos"
          />
        </View>
        {modalIsOpen && <View style={styles.overlay} pointerEvents="auto" />}
      </TemplateScreen>

      <OccurrenceModal
        visible={!!selectedOccurrence}
        onClose={() => setSelectedOccurrence(null)}
        occurrenceId={selectedOccurrence?.id || null}
        occurrence={selectedOccurrence}
        onUpdate={handleOccurrenceUpdate}
      />

      <AuthorizationModal
        visible={!!selectedAuthorization}
        onClose={() => setSelectedAuthorization(null)}
        authorizationId={selectedAuthorization?.id || null}
        authorization={selectedAuthorization}
        onUpdate={handleAuthorizationUpdate}
      />

      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 10,
  },
});
