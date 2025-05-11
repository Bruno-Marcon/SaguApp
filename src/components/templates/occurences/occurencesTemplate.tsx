import { useState, useMemo } from 'react'
import { ScrollView } from 'react-native'
import TemplateScreen from '../../../components/templates/scrollView/templateScreen'
import { OccurrencesHeader } from '../../organisms/header/occurrencesHeader'
import OccurrencesList from '../../organisms/list/occurencesList'
import { useOccurrence } from '@//hook/occurrence/useOccurence'
import { useRouter } from 'expo-router'

export default function OccurrencesTemplate() {
  const router = useRouter()

  const [classFilter, setClassFilter] = useState<string>('Todos')
  const [yearFilter, setYearFilter] = useState<string>('2024')
  const [statusFilter, setStatusFilter] = useState<string>('Todos')

  const filters = useMemo(() => ({
    classId: classFilter === 'Todos' ? undefined : classFilter,
    year: yearFilter,
    status: statusFilter === 'Todos' ? undefined : statusFilter,
  }), [classFilter, yearFilter, statusFilter])

  const { occurrences, loading } = useOccurrence(filters)

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back()
    } else {
      router.replace('/')
    }
  }

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
        />
        <OccurrencesList occurrences={occurrences} loading={loading} />
      </ScrollView>
    </TemplateScreen>
  )
}
