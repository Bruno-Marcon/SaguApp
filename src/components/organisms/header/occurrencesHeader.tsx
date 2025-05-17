import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowBack } from '../../atoms/button/arrowBack';
import DropdownFilter from '../../atoms/filter/dropDownFilter';
import { Feather } from '@expo/vector-icons';

type OccurrencesHeaderProps = {
  showBackButton?: boolean;
  onPressExpand?: () => void;
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
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View className="w-full">
      {/* Título centralizado com ícone e botão voltar */}
      <View className="flex-row items-center justify-center mb-6 relative">
        {showBackButton && (
          <TouchableOpacity onPress={onBackPress} className="absolute left-0 p-1">
            <Feather name="arrow-left" size={22} color="#15803D" />
          </TouchableOpacity>
        )}
        <View className="flex-row items-center gap-x-2">
          <View className="bg-yellow-400 rounded-full p-2">
            <Feather name="alert-triangle" size={18} color="#fff" />
          </View>
          <Text className="text-xl font-bold text-gray-900">
            Ocorrências Recentes
          </Text>
        </View>
      </View>

      {/* Título da seção de filtros + botão expandir */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-base font-semibold text-gray-800">Filtros</Text>

        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} className="flex-row items-center">
          <Text className="text-green-600 font-medium text-sm mr-1">
            {isExpanded ? 'Ver menos' : 'Ver todos'}
          </Text>
          <Feather name={isExpanded ? 'chevron-up' : 'chevron-down'} size={16} color="#16A34A" />
        </TouchableOpacity>
      </View>

      {/* Filtros visuais */}
      <View className="flex-col gap-3">
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

        {isExpanded && (
          <>
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
          </>
        )}
      </View>
    </View>
  );
};
