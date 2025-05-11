import { useState } from "react"
import { ScrollView } from "react-native"
import OccurrencesList from '@//components/organisms/list/occurencesList'
import { OccurrencesHeader } from '@//components/organisms/header/occurrencesHeader'
import { useOccurrence } from "@//hook/occurrence/useOccurence"

export default function OccurrencesTemplate() {
  const [filters, setFilters] = useState({
    turma: "Todos",
    ano: "2024",
    periodo: "20/10/2024",
    ate: "27/10/2024"
  })

  const { occurrences, loading, error } = useOccurrence()

  const filteredOccurrences = occurrences.filter(o => {
    return (
      (filters.turma === "Todos" || o.class === filters.turma) &&
      o.date <= filters.ate
    )
  })

  return (
    <ScrollView className="flex-1 px-4 pt-4">
      <OccurrencesHeader
        filters={filters}
        onChangeFilters={setFilters}
      />
      <OccurrencesList occurrences={filteredOccurrences} />
    </ScrollView>
  )
}
