import { View, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { useUserProfile } from '@//hook/useUserProfile'
import { LoadingIndicator } from '../../atoms/indicators/loadingIndicator'
import { ErrorMessage } from '../../atoms/indicators/errorMessage'
import TemplateScreen from '../scrollView/templateScreen'
import { ApresentationSection } from '../../molecules/section/apresentation/apresentationSectionWithStatus'
import SectionTableList from '../../molecules/section/table/sectionTableList'
import GradesList from '../../molecules/grades/gradesList'
import SectionOccurrences from '../../organisms/section/SectionOccurrences'
import AttendanceSection from '../../molecules/section/attendance/sectionAttendance'
import { useOccurrence } from "../../../hook/occurrence/useOccurence"

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

  const router = useRouter()
  
  const handleRefresh = async () => {
    await refresh()
  }

  const handleOccurrencesPress = () => {
    router.push('/(panel)/occurences/occurences')
  }

  if (loading) return <LoadingIndicator />
  if (error) return <ErrorMessage message={error} onRetry={handleRefresh} />
  if (!userData) return <ErrorMessage message="Dados do usuário não encontrados" onRetry={handleRefresh} />

  return (
    <TemplateScreen withHeader={true}>
      <ScrollView className="flex-1">
        <ApresentationSection
          name={`Olá, ${userData.name}`}
          subtitle="Seja bem-vindo ao App Escola"
          statusCards={MOCK_DATA.statusCards}
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
          <SectionOccurrences
            sectionTitle="Ocorrências Recentes"
            items={occurrences}
            onPress={handleOccurrencesPress}
          />
          {occurrencesLoading && <LoadingIndicator />}
          {occurrencesError && <ErrorMessage message={occurrencesError} />}
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