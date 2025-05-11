import { View, Text } from 'react-native';
import { EventCard } from '../../molecules/card/eventCardMolecules';

type EventListProps = {
  selectedDate: Date;
};

export const EventList = ({ selectedDate }: EventListProps) => {
  const sampleDate = new Date('2025-05-11');

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  return (
    <View className="mt-4 p-2">
      {isSameDay(selectedDate, sampleDate) ? (
        <>
          <EventCard
            title="Avaliação II - Individual"
            subtitle="Saúde Coletiva e Políticas Públicas em Saúde (20070)"
            time="00:00 - 23:59"
          />
          <EventCard
            title="Avaliação Final (Discursiva) - Individual"
            subtitle="Saúde Coletiva e Políticas Públicas em Saúde (20070)"
            time="00:00 - 23:59"
          />
        </>
      ) : (
        <Text className="text-center text-gray-500">Nenhum evento para esta data.</Text>
      )}
    </View>
  );
};
