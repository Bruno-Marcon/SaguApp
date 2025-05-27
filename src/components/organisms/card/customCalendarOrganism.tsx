import { useEffect, useState, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { EventList } from '../list/eventListOrganism';
import { ArrowBack } from '../../atoms/button/arrowBack';
import { useRouter } from 'expo-router';
import { scheduleService } from '@//services/schedules/schedulesService';
import { Schedule } from '../../../../types/schedules';
import { ScheduleFormModal } from '../modal/schedulesFormModal';

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
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(todayString);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(today);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

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

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  const staticMarkedDates = useMemo(() => {
    const markings: MarkedDate = {};
    schedules.forEach(schedule => {
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

  const changeWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction === 'prev' ? -7 : 7));
    setCurrentWeek(newDate);
  };

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  const handleUpdateScheduleStatus = (id: string, status: string) => {
    setSchedules(prev =>
      prev.map(s =>
        s.id === id ? { ...s, attributes: { ...s.attributes, status } } : s
      )
    );
  };

  const filteredSchedules = useMemo(() => {
    const filtered = showAllEvents
      ? schedules
      : schedules.filter(schedule => {
          if (!schedule.attributes.starts_at) return false;
          const scheduleDate = schedule.attributes.starts_at.split('T')[0];
          return scheduleDate === selectedDate;
        });

    return filtered.sort((a, b) =>
      new Date(a.attributes.starts_at).getTime() - new Date(b.attributes.starts_at).getTime()
    );
  }, [schedules, selectedDate, showAllEvents]);

  const handleCardPress = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setModalVisible(true);
  };

  return (
    <ScrollView className="bg-white dark:bg-neutral-950 p-4 rounded-2xl">
      <View className="flex-row justify-between items-center p-2 mb-4 mt-4">
        <ArrowBack color="#09a342" size={29} onPress={handleBackPress} />
        <Text className="text-xl font-semibold text-white">Calendár</Text>
        <TouchableOpacity
          onPress={() => {
            setEditingSchedule(undefined);
            setModalVisible(true);
          }}
          className="bg-green-600 px-3 py-1 rounded-lg"
        >
          <Text className="text-white font-semibold text-sm">+ Novo</Text>
        </TouchableOpacity>
      </View>

      <Calendar
        current={todayString}
        minDate={todayString}
        onDayPress={onDayPress}
        markedDates={mergedMarkedDates}
        markingType="dot"
        monthFormat={'MMMM yyyy'}
        theme={{
          calendarBackground: '#FFFFFF',
          textSectionTitleColor: '#6B7280',
          selectedDayBackgroundColor: '#09a342',
          selectedDayTextColor: '#FFFFFF',
          todayTextColor: '#09a342',
          dayTextColor: '#111827',
          textDisabledColor: '#9CA3AF',
          dotColor: '#09a342',
          selectedDotColor: '#FFFFFF',
          arrowColor: '#09a342',
          monthTextColor: '#09a342',
          textMonthFontSize: 18,
          textMonthFontWeight: 'bold',
          textDayFontWeight: '600',
          textDayHeaderFontWeight: '600',
        }}
      />

      <View className="flex-row justify-start space-x-1 ml-[2%] mt-2">
        <View className="w-2 h-2 bg-[#09a342] rounded-full" />
        <Text className="text-sm ml-1 dark:text-gray-200">Agendamentos</Text>
      </View>

      <TouchableOpacity
        onPress={() => setShowAllEvents(prev => !prev)}
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
        existingSchedule={editingSchedule}
      />
    </ScrollView>
  );
};
