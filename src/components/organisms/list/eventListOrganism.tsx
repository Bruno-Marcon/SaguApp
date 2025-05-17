import { useEffect, useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import { EventCard } from '../../molecules/card/eventCardMolecules';
import Loading from '../../atoms/indicators/loadingAtom';
import { Event } from '../../../../types/event';
import { eventService } from '@//services/events/eventServices';

type EventListProps = {
  selectedDate: Date | null;
};

export const EventList = ({ selectedDate }: EventListProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventService.getLatestEvents();
        setEvents(response.data);
      } catch (err: any) {
        console.error('[EVENT LIST] Erro ao carregar eventos:', err);
        setError('Ocorreu um erro ao carregar os eventos 😵');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    if (!selectedDate) return events;
    return events.filter(event => {
      const eventDateUTC = new Date(event.attributes.created_at);
      const eventDateLocal = new Date(
        eventDateUTC.getTime() + eventDateUTC.getTimezoneOffset() * 60000
      );
      return isSameDay(eventDateLocal, selectedDate);
    });
  }, [events, selectedDate]);

  if (loading) return <Loading />;

  if (error) {
    return (
      <Text className="text-center text-red-500 mt-4">
        {error}
      </Text>
    );
  }

  return (
    <View className="mt-4 p-2">
      {filteredEvents.length === 0 ? (
        <Text className="text-center text-gray-500">
          Nenhum evento para esta data.
        </Text>
      ) : (
        filteredEvents.map(event => {
          const eventDate = new Date(event.attributes.created_at);
          const eventDateLocal = new Date(
            eventDate.getTime() + eventDate.getTimezoneOffset() * 60000
          );

          return (
            <EventCard
              key={event.id}
              title={event.attributes.description}
              subtitle={`ID: ${event.attributes.eventable_id}`}
              time={eventDateLocal.toLocaleTimeString('pt-BR')}
              date={eventDateLocal}
            />
          );
        })
      )}
    </View>
  );
};
