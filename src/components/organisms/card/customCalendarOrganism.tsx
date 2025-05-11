import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  PanResponder,
} from 'react-native';
import { CalendarHeader } from '../header/calendarHeaderOrganism';
import { EventList } from '../list/eventListOrganism';

const SCREEN_WIDTH = Dimensions.get('window').width;

const getStartOfWeek = (date: Date) => {
  const start = new Date(date);
  start.setDate(date.getDate() - start.getDay());
  return start;
};

const getWeekDates = (startDate: Date) =>
  Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    return d;
  });

export const CustomCalendar = () => {
  const today = new Date();
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(today));
  const [weekDates, setWeekDates] = useState<Date[]>(getWeekDates(currentWeekStart));
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const animX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setWeekDates(getWeekDates(currentWeekStart));
    setSelectedDate(getWeekDates(currentWeekStart)[0]);
  }, [currentWeekStart]);

  const animateTransition = (direction: 'left' | 'right') => {
    const toValue = direction === 'left' ? -SCREEN_WIDTH : SCREEN_WIDTH;

    Animated.sequence([
      Animated.timing(animX, {
        toValue,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(animX, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const goToNextWeek = () => {
    animateTransition('left');
    const next = new Date(currentWeekStart);
    next.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(next);
  };

  const goToPrevWeek = () => {
    animateTransition('right');
    const prev = new Date(currentWeekStart);
    prev.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(prev);
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 20,
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx < -50) goToNextWeek();
      else if (gesture.dx > 50) goToPrevWeek();
    },
  });

  const isToday = (date: Date) =>
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const isSelected = (date: Date) =>
    date.getDate() === selectedDate.getDate() &&
    date.getMonth() === selectedDate.getMonth() &&
    date.getFullYear() === selectedDate.getFullYear();

  const daysShort = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const monthName = currentWeekStart.toLocaleString('default', { month: 'long' });
  const year = currentWeekStart.getFullYear();

  return (
    <View className="bg-white p-4 rounded-2xl" {...panResponder.panHandlers}>
      <CalendarHeader
        title={`${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`}
        onNext={goToNextWeek}
        onPrev={goToPrevWeek}
        notificationCount={2}
      />

      <Animated.View
        style={{ transform: [{ translateX: animX }] }}
        className="mt-4"
      >
        <View className="flex-row justify-between mb-2">
          {daysShort.map((day, index) => (
            <Text key={index} className="text-green-800 m-2 w-[15%] text-center text-xl font-extrabold">
              {day}
            </Text>
          ))}
        </View>

        <View className="flex-row justify-between mb-4">
        {weekDates.map((date, index) => {
            const selected = date.toDateString() === selectedDate?.toDateString();
            const todayMatch = isToday(date);

            return (
            <TouchableOpacity
                key={index}
                onPress={() => setSelectedDate(date)}
                className={`w-[20%] h-15 p-2 rounded-full justify-center items-center 
                ${todayMatch ? 'bg-green-500' : ''}
                ${selected && !todayMatch ? 'border border-white' : ''}
                `}
                activeOpacity={0.7}
            >
                <Text
                className={`text-xl font-bold ${
                    todayMatch || selected ? 'text-black' : 'text-green-800'
                }`}
                >
                {date.getDate()}
                </Text>
            </TouchableOpacity>
            );
        })}
        </View>
      </Animated.View>

      <View className="flex-row justify-start space-x-1 ml-[2%]">
        <View className="w-2 h-2 bg-red-500 rounded-full" />
        <View className="w-2 h-2 bg-green-500 rounded-full" />
      </View>

      <EventList selectedDate={selectedDate} />
    </View>
  );
};
