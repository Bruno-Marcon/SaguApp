import { useEffect, useState } from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import { Occurrence } from '../../../../types/occurrence'
import { occurrenceService } from '@//services/occurrence/occurrenceService'
import { OccurrenceHeader } from '../../organisms/header/occurrencesHeader'
import DropdownFilter from '../../atoms/filter/dropDownFilter'
import OccurrenceList from '../../organisms/list/occurencesList'

type Props = {
  refreshing: boolean
  onRefreshEnd: () => void
}

export default function OccurrenceTemplate({ refreshing, onRefreshEnd }: Props) {
  const [occurrences, setOccurrences] = useState<Occurrence[]>([])
  const [loading, setLoading] = useState(true)

  const [status, setStatus] = useState('Todos')
  const [severity, setSeverity] = useState('Todos')

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await occurrenceService.getAll({
        status: status !== 'Todos' ? status : undefined,
        severity: severity !== 'Todos' ? severity : undefined,
      })
      setOccurrences(response.data)
    } catch (err) {
      console.error('Erro ao buscar ocorrências:', err)
    }
    setLoading(false)
    onRefreshEnd()
  }

  useEffect(() => {
    fetchData()
  }, [status, severity])

  useEffect(() => {
    if (refreshing) fetchData()
  }, [refreshing])

  const today = occurrences.filter((o) =>
    new Date(o.created_at).toDateString() === new Date().toDateString()
  )

  const others = occurrences.filter((o) =>
    new Date(o.created_at).toDateString() !== new Date().toDateString()
  )

  if (loading && !refreshing) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0E7C4A" />
      </View>
    )
  }

  return (
    <View className="flex-1 bg-gray-50">
      <OccurrenceHeader title="Ocorrências Recentes" />

      <View className="px-4 pt-2">
        <DropdownFilter
          label="Status"
          selected={status}
          onSelect={setStatus}
          options={[
            { label: 'Todos', value: 'Todos' },
            { label: 'Aberta', value: 'Aberta' },
            { label: 'Em andamento', value: 'Em andamento' },
            { label: 'Resolvida', value: 'Resolvida' },
          ]}
        />
        <DropdownFilter
          label="Gravidade"
          selected={severity}
          onSelect={setSeverity}
          options={[
            { label: 'Todos', value: 'Todos' },
            { label: 'Alta', value: 'Alta' },
            { label: 'Média', value: 'Média' },
            { label: 'Baixa', value: 'Baixa' },
          ]}
        />

        {today.length > 0 && <OccurrenceList title="Hoje" data={today} />}
        {others.length > 0 && <OccurrenceList title="Ocorrências anteriores" data={others} />}

        {today.length === 0 && others.length === 0 && !loading && (
          <Text className="text-center text-gray-500 mt-4">Nenhuma ocorrência encontrada.</Text>
        )}
      </View>
    </View>
  )
}
