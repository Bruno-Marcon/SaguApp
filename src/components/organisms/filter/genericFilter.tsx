import { View } from 'react-native';
import DropdownFilter from '../../atoms/filter/dropDownFilter';
import DateRangePickerFilter from '../../atoms/filter/dateRangePickerFilter';

type Option = {
  label: string;
  value: string;
};

type Props = {
  status?: {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
  };
  severity?: {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
  };
  student?: {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
  };
  dateRange?: {
    start: Date | null;
    end: Date | null;
    onStartChange: (date: Date) => void;
    onEndChange: (date: Date) => void;
  };
};

export default function GenericFilters({ status, severity, student, dateRange }: Props) {
  return (
    <View className="px-4 pt-2">
      {dateRange && (
        <DateRangePickerFilter
          label="Período"
          startDate={dateRange.start}
          endDate={dateRange.end}
          onStartDateChange={dateRange.onStartChange}
          onEndDateChange={dateRange.onEndChange}
        />
      )}

      {status && (
        <DropdownFilter
          label="Status"
          selected={status.value}
          onSelect={status.onChange}
          options={status.options}
        />
      )}

      {severity && (
        <DropdownFilter
          label="Gravidade"
          selected={severity.value}
          onSelect={severity.onChange}
          options={severity.options}
        />
      )}

      {student && (
        <DropdownFilter
          label="Estudante"
          selected={student.value}
          onSelect={student.onChange}
          options={student.options}
        />
      )}
    </View>
  );
}