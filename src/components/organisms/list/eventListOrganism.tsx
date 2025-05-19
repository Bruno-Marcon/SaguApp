import { useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { EventCard } from '../../molecules/card/eventCardMolecules';
import { Schedule } from '../../../../types/schedules';
import { scheduleService } from '@//services/schedules/schedulesService';

type EventListProps = {
  selectedDate: Date | null;
  events: Schedule[];
  onCardPress?: (event: Schedule) => void;
};

export const EventList = ({ selectedDate, events: initialEvents, onCardPress }: EventListProps) => {
  const [localEvents, setLocalEvents] = useState(initialEvents);

  const filteredEvents = useMemo(() => {
    if (!selectedDate) return localEvents;

    const selectedDateStr = selectedDate.toISOString().split('T')[0];

    return localEvents.filter(event => {
      const eventDateStr = event.attributes.starts_at.split('T')[0];
      return eventDateStr === selectedDateStr;
    });
  }, [localEvents, selectedDate]);

  const handleConfirm = async (event: Schedule) => {
    try {
      await scheduleService.updateSchedule(event.id, { status: 'confirmed' });

      // Atualizar localmente o status
      setLocalEvents(prev =>
        prev.map(e =>
          e.id === event.id ? { ...e, attributes: { ...e.attributes, status: 'confirmed' } } : e
        )
      );

      Toast.show({
        type: 'success',
        text1: 'Agendamento confirmado!',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao confirmar agendamento',
      });
      console.error('[EVENT LIST] Erro ao confirmar:', error);
    }
  };

  if (!initialEvents || initialEvents.length === 0) {
    return (
      <Text className="text-center text-gray-500 mt-4">
        Nenhum agendamento encontrado.
      </Text>
    );
  }

  return (
    <View className="mt-4 p-2">
      {filteredEvents.length === 0 ? (
        <Text className="text-center text-gray-500">
          Nenhum agendamento para esta data.
        </Text>
      ) : (
        filteredEvents.map(event => {
          const startsAt = event.attributes.starts_at;
          const dateStr = startsAt.split('T')[0];
          const timeStr = startsAt.split('T')[1]?.substring(0, 5);

          return (
            <EventCard
              key={event.id}
              title={event.attributes.subject}
              subtitle={event.attributes.area}
              author={event.attributes.status}
              dateString={dateStr}
              time={timeStr}
              onPress={() => onCardPress?.(event)}
              onConfirm={() => handleConfirm(event)}
            />
          );
        })
      )}
    </View>
  );
};
