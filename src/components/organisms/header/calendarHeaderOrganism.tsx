import { View, TouchableOpacity } from 'react-native';
import { TextAtom } from '../../atoms/text/textAtom';
import { Icon } from '../../atoms/icons/iconAtom';

interface CalendarHeaderProps {
  title: string;
  onNext: () => void;
  onPrev: () => void;
  notificationCount?: number;
}

export const CalendarHeader = ({
  title = 'Calendário',
  onNext,
  onPrev,
  notificationCount = 2,
}: CalendarHeaderProps) => (
  <View className="flex-row items-center justify-between px-8 py-3 mb-1">
    <View className="flex-row items-center gap-4">
      <Icon name="calendar" color="#00FF00" />
      <TextAtom variant="title">{title}</TextAtom>
      {notificationCount > 0 && (
        <View className="bg-red-500 rounded-full w-5 h-5 items-center justify-center ml-2">
          <TextAtom variant="body" className="text-white text-xs">{notificationCount}</TextAtom>
        </View>
      )}
    </View>

    <View className="flex-row gap-4">
      <TouchableOpacity onPress={onPrev}>
        <Icon name="chevron-left" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext}>
        <Icon name="chevron-right" />
      </TouchableOpacity>
    </View>
  </View>
);
