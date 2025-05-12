import { useMemo } from 'react'
import { View, Text } from 'react-native'
import { EventCard } from '../../molecules/card/eventCardMolecules'
import Loading from '../../atoms/indicators/loadingAtom'
import { useEvents } from '@//hook/events/useEvents'

type EventListProps = {
  selectedDate: Date | null
}

export const EventList = ({ selectedDate }: EventListProps) => {
  const { events, loading, error } = useEvents()

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()

  const filteredEvents = useMemo(() => {
    if (!selectedDate) return events
    return events.filter(event => {
      const eventDateUTC = new Date(event.attributes.created_at)
      const eventDateLocal = new Date(
        eventDateUTC.getTime() + eventDateUTC.getTimezoneOffset() * 60000
      )
      return isSameDay(eventDateLocal, selectedDate)
    })
  }, [events, selectedDate])

  if (loading) return <Loading />

  if (error) {
    return (
      <Text className="text-center text-red-500 mt-4">
        Ocorreu um erro ao carregar os eventos 😵
      </Text>
    )
  }

  return (
    <View className="mt-4 p-2">
      {filteredEvents.length === 0 ? (
        <Text className="text-center text-gray-500">
          Nenhum evento para esta data.
        </Text>
      ) : (
        filteredEvents.map(event => {
          const eventDate = new Date(event.attributes.created_at)
          const eventDateLocal = new Date(
            eventDate.getTime() + eventDate.getTimezoneOffset() * 60000
          )
          return (
            <EventCard
              key={event.id}
              title={event.attributes.description}
              subtitle={event.attributes.eventable_id}
              time={eventDateLocal.toLocaleTimeString('pt-BR')}
              date={eventDateLocal}
            />
          )
        })
      )}
    </View>
  )
}
