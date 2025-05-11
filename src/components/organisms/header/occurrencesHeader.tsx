import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import DropdownFilter from '../../atoms/filter/dropDownFilter'
import { ArrowBack } from '../../atoms/button/arrowBack'

type OccurrencesHeaderProps = {
  showBackButton?: boolean
  onBackPress?: () => void
  classValue: string
  yearValue: string
  statusValue: string
  onClassChange: (newValue: string) => void
  onYearChange: (newValue: string) => void
  onStatusChange: (newValue: string) => void
}

export const OccurrencesHeader = ({
  showBackButton = true,
  onBackPress,
  classValue,
  yearValue,
  statusValue,
  onClassChange,
  onYearChange,
  onStatusChange
}: OccurrencesHeaderProps) => {
  return (
    <View className="mt-8 mb-2">
      {showBackButton && <ArrowBack onPress={onBackPress} className="mb-2" />}
      <Text className="text-2xl font-bold text-gray-800">Ocorrências</Text>

      <View className="flex-row justify-between mt-5 mb-2">
        <DropdownFilter
          label="Turma"
          value={classValue}
          options={["Todos", "Turma 1", "Turma 2"]}
          onChange={onClassChange}
        />
        {/* <DropdownFilter
          label="Ano"
          value={yearValue}
          options={["2024", "2023", "2022"]}
          onChange={onYearChange}
        />
        <DropdownFilter
          label="Status"
          value={statusValue}
          options={["Todos", "Novo", "Em andamento", "Finalizado"]}
          onChange={onStatusChange}
        /> */}
      </View>
    </View>
  )
}
