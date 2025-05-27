import { useState, useCallback } from 'react'
import TemplateScreen from '@//components/templates/scrollView/templateScreen'
import OccurrenceTemplate from '@//components/templates/occurences/occurencesTemplate'
import OccurrenceDetailModal from '@//components/organisms/modal/occurrenceModal'
import { Occurrence } from '../../../../types/occurrence'


export default function OcorrenciasPage() {
  const [refreshing, setRefreshing] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedOccurrence, setSelectedOccurrence] = useState<Occurrence | null>(null)

  const handleRefresh = useCallback(() => {
    setRefreshing(true)
  }, [])

  const handleRefreshEnd = () => {
    setRefreshing(false)
  }

  const openModal = (occurrence: Occurrence) => {
    setSelectedOccurrence(occurrence)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setSelectedOccurrence(null)
  }

  return (
    <>
      <TemplateScreen withSafeArea withHeader={false} withBottomBar>
        <OccurrenceTemplate
          refreshing={refreshing}
          onRefreshEnd={handleRefreshEnd}
          onOccurrencePress={openModal}
        />
      </TemplateScreen>

      <OccurrenceDetailModal
        visible={modalVisible}
        onClose={closeModal}
        occurrenceId={selectedOccurrence?.id ?? null}
        occurrence={selectedOccurrence}
      />
    </>
  )
}
