import { View, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { useUserProfile } from '@//hook/useUserProfile'
import { LoadingIndicator } from '../../atoms/indicators/loadingIndicator'
import { ErrorMessage } from '../../atoms/indicators/errorMessage'
import TemplateScreen from '../scrollView/templateScreen'
import { ApresentationSection } from '../../molecules/section/apresentation/apresentationSectionWithStatus'
import AttendanceSection from '../../molecules/section/attendance/sectionAttendance'
import { useOccurrence } from "../../../hook/occurrence/useOccurence"
import { useStats } from '@//hook/stats/useStats'
import { SectionWithCarousel } from '../../organisms/carousel/sectionWithCarousel'
import { useAuthorizationsWithNames } from '@//hook/authorizations/useAuthorizations'
import { AuthorizationItem } from '../../../../types/authorizations'
import { useState, useEffect } from 'react'

export const HomeScreen = () => {
  const { userData, loading, error, refresh } = useUserProfile()
  const { occurrences, loading: occurrencesLoading, error: occurrencesError } = useOccurrence()
  const { data } = useAuthorizationsWithNames()
  const { stats, loading: statsLoading, error: statsError, refetch: refetchStats } = useStats()
  const router = useRouter()

  const [authorizationData, setAuthorizationData] = useState<AuthorizationItem[]>([])

  useEffect(() => {
    if (!loading && !error && data) {
      setAuthorizationData(data)
    }
  }, [loading, error, data])

  const handleRefresh = async () => {
    await refresh()
    refetchStats()
  }

  const handleOccurrencesPress = () => {
    router.push('/(panel)/occurences/occurences')
  }

  if (loading || statsLoading) return <LoadingIndicator />
  if (error) return <ErrorMessage message={error} onRetry={handleRefresh} />
  if (!userData) return <ErrorMessage message="Dados do usuário não encontrados" onRetry={handleRefresh} />
  if (authorizationData.length === 0) return <ErrorMessage message="Nenhuma autorização encontrada." onRetry={() => {}} />

  return (
    <TemplateScreen withHeader={true}>
      <ScrollView className="flex-1">
        <ApresentationSection
          name={`Olá, ${userData.name}`}
          subtitle="Seja bem-vindo ao Sagu App"
          statusCards={[ 
            {
              iconName: "calendar" as const,
              title: "Agendamentos",
              subtitle: stats ? stats.scheduled_appointments.toString() : 'Carregando...',
              iconColor: "#F59E0B"
            },
            {
              iconName: "alert-circle" as const,
              title: "Ocorrências",
              subtitle: stats ? stats.pending_occurrencies.toString() : 'Carregando...',
              iconColor: "#EF4444"
            },
            {
              iconName: "edit" as const,
              title: "Orientações",
              subtitle: stats ? stats.pending_orientations.toString() : 'Carregando...',
              iconColor: "#10B981"
            }
          ]}
        />
        <View className="m-2">
          <SectionWithCarousel
            data={occurrences}
            title={'Ocorrências'}
            linkText={'Ver Todos'}
            onPressLink={handleOccurrencesPress} type={'occurrence'} />
        </View>
        <View className="m-2">
          <SectionWithCarousel
            data={authorizationData}
            title={'Autorizações'}
            linkText={'Ver Todas'}
            onPressLink={handleOccurrencesPress} 
            type="authorization"
          />
        </View>
        <AttendanceSection 
          title="Eventos Agendados"
          percentage={85} 
          onPressLink={() => console.log('Navigate to attendance')}
        />
      </ScrollView>
    </TemplateScreen>
  )
}
