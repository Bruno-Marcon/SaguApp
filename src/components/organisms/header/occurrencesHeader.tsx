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
      {showBackButton && <ArrowBack onPress={onBackPress} className="mb-2" color='#09a342' size={29} />}
      <Text className="text-2xl font-bold text-gray-800">Ocorrências</Text>

      <View className="flex-row justify-between mt-5 mb-2">
        <DropdownFilter
          label="Turma"
          value={classValue}
          options={["Todos", "Turma 1", "Turma 2"]}
          onChange={onClassChange}
        />
      </View>
    </View>
  )
}
