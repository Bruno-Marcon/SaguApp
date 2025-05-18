import OccurrenceTemplate from '@//components/templates/occurences/occurencesTemplate'
import TemplateScreen from '@//components/templates/scrollView/templateScreen'
import { useState, useCallback } from 'react'

export default function OcorrenciasPage() {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = useCallback(() => {
    setRefreshing(true)
  }, [])

  const handleRefreshEnd = () => {
    setRefreshing(false)
  }

  return (
    <TemplateScreen 
      withSafeArea 
      withHeader={false}
      withBottomBar
    >
      <OccurrenceTemplate 
        refreshing={refreshing}
        onRefreshEnd={handleRefreshEnd}
      />
    </TemplateScreen>
  )
}
