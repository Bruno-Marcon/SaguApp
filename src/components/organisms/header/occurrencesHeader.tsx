import { View, Text } from 'react-native';
import { ArrowBack } from '../../atoms/button/arrowBack';
import DropdownFilter from '../../atoms/filter/dropDownFilter';

type Option = {
  label: string;
  value: string;
};

type OccurrencesHeaderProps = {
  showBackButton?: boolean;
  onBackPress?: () => void;
  classValue: string;
  yearValue: string;
  statusValue: string;
  onClassChange: (newValue: string) => void;
  onYearChange: (newValue: string) => void;
  onStatusChange: (newValue: string) => void;
  onStudentChange: (newValue: string) => void;
  onDateChange: (newValue: string) => void;
};

export const OccurrencesHeader = ({
  showBackButton = true,
  onBackPress,
  classValue,
  yearValue,
  statusValue,
  onClassChange,
  onYearChange,
  onStatusChange,
  onStudentChange,
  onDateChange,
}: OccurrencesHeaderProps) => {
  return (
    <View className="mt-8 mb-2">
      {showBackButton && (
        <ArrowBack onPress={onBackPress} className="mb-2" color="#09a342" size={29} />
      )}
      <Text className="text-2xl font-bold text-gray-800">Ocorrências</Text>

      <View className="mt-5 space-y-2">
        <DropdownFilter
          label="Turma"
          value={classValue}
          options={[
            { label: 'Todos', value: 'Todos' },
            { label: 'Turma 1', value: 'Turma 1' },
            { label: 'Turma 2', value: 'Turma 2' },
          ]}
          onChange={onClassChange}
        />

        <DropdownFilter
          label="Ano"
          value={yearValue}
          options={[
            { label: '2023', value: '2023' },
            { label: '2024', value: '2024' },
            { label: '2025', value: '2025' },
          ]}
          onChange={onYearChange}
        />

        <DropdownFilter
          label="Status"
          value={statusValue}
          options={[
            { label: 'Todos', value: 'Todos' },
            { label: 'Aberto', value: 'open' },
            { label: 'Fechado', value: 'closed' },
          ]}
          onChange={onStatusChange}
        />

        <DropdownFilter
          label="Aluno"
          value=""
          options={[
            { label: 'Todos', value: '' },
            { label: 'Aluno 1', value: 'aluno1' },
            { label: 'Aluno 2', value: 'aluno2' },
          ]}
          onChange={onStudentChange}
        />

        <DropdownFilter
          label="Data"
          value=""
          options={[
            { label: 'Todos', value: '' },
            { label: 'Últimos 7 dias', value: '7d' },
            { label: 'Últimos 30 dias', value: '30d' },
          ]}
          onChange={onDateChange}
        />
      </View>
    </View>
  );
};
