import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { EventList } from '../list/eventListOrganism';
import { ArrowBack } from '../../atoms/button/arrowBack';
import { useRouter } from 'expo-router';

const getEventsForDate = (date: string) => {
  const events = [
    { date: '2025-05-11', color: 'red' },
    { date: '2025-05-12', color: 'green' },
  ];

  const event = events.find(event => event.date === date);
  
  return event ? event.color : undefined;
};

export const CustomCalendar = () => {
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayString);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(today);

  const router = useRouter();

  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  const changeWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction === 'prev' ? -7 : 7));
    setCurrentWeek(newDate);
  };

  const monthName = currentWeek.toLocaleString('default', { month: 'long' });
  const year = currentWeek.getFullYear();

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();  // Volta para a tela anterior
    } else {
      router.replace('/');  // Substitui a tela atual pela tela inicial (home)
    }
  };

  return (
    <View className="bg-white p-4 rounded-2xl">
      <View className="p-2 mb-4" style={{ marginTop: 20 }}>
        <ArrowBack color='#09a342' size={29} onPress={handleBackPress} />
      </View>

      <Calendar
        current={todayString}
        minDate={todayString}
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: 'blue',
            selectedTextColor: 'white',
          },
          [todayString]: {
            selected: true,
            selectedColor: 'purple',
            selectedTextColor: 'white',
          },
          ...(getEventsForDate(selectedDate) && {
            [selectedDate]: {
              marked: true,
              dotColor: getEventsForDate(selectedDate),
              activeOpacity: 0,
            }
          })
        }}
        markingType="dot"
        monthFormat={'yyyy MM'}
        theme={{
          textDayFontWeight: 'bold',
          textMonthFontSize: 18,
          textMonthFontWeight: 'bold',
          todayTextColor: '#fff',
          arrowColor: '#09a342',
          monthTextColor: '#09a342',
        }}
      />

      <View className="flex-row justify-start space-x-1 ml-[2%]">
        <View className="w-2 h-2 bg-red-500 rounded-full" />
        <View className="w-2 h-2 bg-green-500 rounded-full" />
      </View>

      <TouchableOpacity
        onPress={() => setShowAllEvents(prev => !prev)}
        className="self-end mb-2 mr-1"
      >
        {/* Coloquei o texto dentro do componente <Text> */}
        <Text className="text-green-700 underline text-sm">
          {showAllEvents ? 'Ver apenas dia selecionado' : 'Ver todos os eventos'}
        </Text>
      </TouchableOpacity>

      <EventList selectedDate={showAllEvents ? null : new Date(selectedDate)} />
    </View>
  );
};
