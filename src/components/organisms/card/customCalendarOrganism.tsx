import { useEffect, useState, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { EventList } from '../list/eventListOrganism';
import { useRouter } from 'expo-router';
import { scheduleService } from '@//services/schedules/schedulesService';
import { Schedule } from '../../../../types/schedules';
import { ScheduleFormModal } from '../modal/schedulesFormModal';
import { CalendarHeader } from '../header/calendarHeaderOrganism';
import { getUserInfo } from '@//storage/SecureUser';

type MarkedDate = {
  [date: string]: {
    marked?: boolean;
    selected?: boolean;
    selectedColor?: string;
    selectedTextColor?: string;
    dotColor?: string;
    activeOpacity?: number;
  };
};

export const CustomCalendar = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(todayString);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [studentId, setStudentId] = useState<string>('');

  const [modalVisible, setModalVisible] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | undefined>(undefined);

  const router = useRouter();

  const fetchSchedules = useCallback(async () => {
    try {
      const result = await scheduleService.getSchedules();
      setSchedules(result?.data ?? []);
    } catch (error) {
      console.error('[CALENDAR] Erro ao buscar agendamentos:', error);
    }
  }, []);

  const fetchStudentId = useCallback(async () => {
    const user = await getUserInfo();
    if (user?.id) {
      setStudentId(user.id);
    }
  }, []);

  useEffect(() => {
    fetchSchedules();
    fetchStudentId();
  }, [fetchSchedules, fetchStudentId]);

  const staticMarkedDates = useMemo(() => {
    const markings: MarkedDate = {};
    schedules.forEach((schedule) => {
      const date = schedule.attributes?.starts_at?.split('T')[0];
      if (date) {
        markings[date] = {
          marked: true,
          dotColor: '#09a342',
        };
      }
    });
    return markings;
  }, [schedules]);

  const mergedMarkedDates = useMemo(() => {
    const merged = { ...staticMarkedDates };
    merged[selectedDate] = {
      ...(merged[selectedDate] || {}),
      selected: true,
      selectedColor: '#09a342',
      selectedTextColor: 'white',
    };
    return merged;
  }, [staticMarkedDates, selectedDate]);

  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  const handleUpdateScheduleStatus = (id: string, status: string) => {
    setSchedules((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, attributes: { ...s.attributes, status } } : s
      )
    );
  };

  const filteredSchedules = useMemo(() => {
    const filtered = showAllEvents
      ? schedules
      : schedules.filter((schedule) => {
          if (!schedule.attributes.starts_at) return false;
          const scheduleDate = schedule.attributes.starts_at.split('T')[0];
          return scheduleDate === selectedDate;
        });

    return filtered.sort(
      (a, b) =>
        new Date(a.attributes.starts_at).getTime() -
        new Date(b.attributes.starts_at).getTime()
    );
  }, [schedules, selectedDate, showAllEvents]);

  const handleCardPress = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setModalVisible(true);
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-neutral-950 rounded-2xl">
      <CalendarHeader
        title="Calendário"
        onAddPress={() => {
          setEditingSchedule(undefined);
          setModalVisible(true);
        }}
        onBackPress={handleBackPress}
      />

      <View className="mt-8">
        <Calendar
          current={todayString}
          minDate={todayString}
          onDayPress={onDayPress}
          markedDates={mergedMarkedDates}
          markingType="dot"
          monthFormat={'MMMM yyyy'}
          theme={{
            calendarBackground: isDark ? '#0a0a0a' : '#FFFFFF',
            textSectionTitleColor: isDark ? '#9CA3AF' : '#4B5563',
            selectedDayBackgroundColor: '#09a342',
            selectedDayTextColor: '#FFFFFF',
            todayTextColor: '#09a342',
            dayTextColor: isDark ? '#F9FAFB' : '#111827',
            textDisabledColor: isDark ? '#6B7280' : '#D1D5DB',
            dotColor: '#09a342',
            selectedDotColor: '#FFFFFF',
            arrowColor: '#09a342',
            monthTextColor: '#09a342',
            textMonthFontSize: 18,
            textMonthFontWeight: 'bold',
            textDayFontWeight: '600',
            textDayHeaderFontWeight: '600',
            textDayFontSize: 16,
            textDayHeaderFontSize: 14,
          }}
        />
      </View>

      <View className="flex-row justify-start space-x-1 ml-[2%] mt-2">
        <View className="w-2 h-2 bg-[#09a342] rounded-full" />
        <Text className="text-sm ml-1 dark:text-gray-200">Agendamentos</Text>
      </View>

      <TouchableOpacity
        onPress={() => setShowAllEvents((prev) => !prev)}
        className="self-end mb-2 mr-1"
      >
        <Text className="text-green-700 dark:text-green-400 underline text-sm">
          {showAllEvents ? 'Ver apenas dia selecionado' : 'Ver todos os eventos'}
        </Text>
      </TouchableOpacity>

      <EventList
        selectedDate={showAllEvents ? null : new Date(selectedDate)}
        events={filteredSchedules}
        onCardPress={handleCardPress}
        onStatusUpdate={handleUpdateScheduleStatus}
      />

      <ScheduleFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedDate={selectedDate}
        onRefresh={fetchSchedules}
        studentId={studentId}
      />
    </ScrollView>
  );
};
