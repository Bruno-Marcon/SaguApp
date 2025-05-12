import { useState, useMemo } from 'react'
import { ScrollView } from 'react-native'
import TemplateScreen from '../../../components/templates/scrollView/templateScreen'
import { useRouter } from 'expo-router'
import { AuthorizationsHeader } from '../../organisms/header/authorizationHeaderOrganism'
import AuthorizationsList from '../../organisms/list/authorizationListOrganism'
import { useAuthorizationsWithNames } from '@//hook/authorizations/useAuthorizations'

export default function AuthorizationsTemplate() {
    
  const router = useRouter()

  const [classFilter, setClassFilter] = useState<string>('Todos')
  const [yearFilter, setYearFilter] = useState<string>('2024')
  const [statusFilter, setStatusFilter] = useState<string>('Todos')

  const filters = useMemo(() => ({
    classId: classFilter === 'Todos' ? undefined : classFilter,
    year: yearFilter,
    status: statusFilter === 'Todos' ? undefined : statusFilter,
  }), [classFilter, yearFilter, statusFilter])

  const { data: authorizations, loading } = useAuthorizationsWithNames()

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
  )
}
