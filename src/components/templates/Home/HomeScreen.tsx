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
import { PrimaryTitle } from '../../atoms/title/primaryTitle'


const MOCK_DATA = {
  grades: [
    { subject: "Matemática", grade: "8.5" },
    { subject: "Português", grade: "9.0" },
    { subject: "História", grade: "8.0" },
  ],
  occurrences: [
    { 
      title: "Disruptive Behavior", 
      description: "Student was talking excessively during class and disrupting others",
      isNew: true,
      authorName: "Emma Johnson",
      category: "Behavioral",
      createdAt: new Date()
    },
    { 
      title: "Late Arrival", 
      description: "Student arrived 15 minutes late to morning class",
      authorName: "Mark Williams",
      category: "Attendance",
      createdAt: new Date(Date.now() - 86400000) // yesterday
    },
  ],
  statusCards: [
    {
      iconName: "book-open" as const,
      title: "Próxima Aula",
      subtitle: "Matemática - 10:00",
      iconColor: "#3B82F6"
    },
    {
      iconName: "check-circle" as const,
      title: "Presença Hoje",
      subtitle: "Presente",
      iconColor: "#10B981"
    },
    {
      iconName: "check-circle" as const,
      title: "Presença Hoje",
      subtitle: "Presente",
      iconColor: "#10B981"
    },
  ]
} as const

export const HomeScreen = () => {
  const { userData, loading, error, refresh } = useUserProfile()
  const { occurrences, loading: occurrencesLoading, error: occurrencesError } = useOccurrence()
  
  // Usando o hook useStats
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
              title: "Compromissos Agendadas",
              subtitle: stats ? stats.scheduled_appointments.toString() : 'Carregando...',
              iconColor: "#F59E0B"
            },
            {
              iconName: "alert-circle" as const,
              title: "Ocorrências Pendentes",
              subtitle: stats ? stats.pending_occurrencies.toString() : 'Carregando...',
              iconColor: "#EF4444"
            },
            {
              iconName: "edit" as const,
              title: "Orientações Pendentes",
              subtitle: stats ? stats.pending_orientations.toString() : 'Carregando...',
              iconColor: "#10B981"
            }
          ]}
        />
        <View className="p-4">
          <SectionTableList
            title="Desempenho Acadêmico"
            linkText="Ver boletim completo"
            onPressLink={() => console.log('Navigate to grades')}
          />
          <GradesList grades={MOCK_DATA.grades} />
        </View>

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

        <AttendanceSection 
          title="Presença"
          percentage={85} 
          onPressLink={() => console.log('Navigate to attendance')}
        />
      </ScrollView>
    </TemplateScreen>
  )
}
