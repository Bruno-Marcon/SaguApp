import { View, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { useUserProfile } from '@//hook/useUserProfile'
import { LoadingIndicator } from '../../atoms/indicators/loadingIndicator'
import { ErrorMessage } from '../../atoms/indicators/errorMessage'
import TemplateScreen from '../scrollView/templateScreen'
import { ApresentationSection } from '../../molecules/section/apresentation/apresentationSectionWithStatus'
import SectionTableList from '../../molecules/section/table/sectionTableList'
import GradesList from '../../molecules/grades/gradesList'
import AttendanceSection from '../../molecules/section/attendance/sectionAttendance'
import { useOccurrence } from "../../../hook/occurrence/useOccurence"
import { useStats } from '@//hook/stats/useStats'
import { OccurrenceSectionWithCarousel } from '../../organisms/carousel/occurrenceSectionWithCarousel'

export const HomeScreen = () => {
  const { userData, loading, error, refresh } = useUserProfile()
  const { occurrences, loading: occurrencesLoading, error: occurrencesError } = useOccurrence()
  
  const { stats, loading: statsLoading, error: statsError, refetch: refetchStats } = useStats()

  const router = useRouter()

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
        <View className="p-4">
          <OccurrenceSectionWithCarousel
          occurrences={occurrences}
          occurrencesLoading={occurrencesLoading}
          occurrencesError={occurrencesError}
          title={'Ocorrências'}
          linkText={'Ver todos'}
          onPressLink={handleOccurrencesPress}
        />
        </View>
        <View className="p-4">
          <SectionTableList
            title="Autorizações"
            linkText="Ver autorizações"
            onPressLink={() => console.log('Navigate to grades')}
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
