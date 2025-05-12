import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { EventCard } from '../../molecules/card/eventCardMolecules';
import Loading from '../../atoms/indicators/loadingAtom';

type EventListProps = {
  selectedDate: Date | null;
};

export const EventList = ({ selectedDate }: EventListProps) => {
  const [loading, setLoading] = useState(true)

  const sampleDate = new Date('2025-05-11');
  const otherSampleDate = new Date('2025-05-12')

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="mt-4 p-2">
      {selectedDate === null ? (
        <>
          <EventCard
            title="Avaliação II - Individual"
            subtitle="Saúde Coletiva e Políticas Públicas em Saúde (20070)"
            time="00:00 - 23:59"
            date={new Date('2025-05-10')}
          />
          <EventCard
            title="Avaliação Final (Discursiva) - Individual"
            subtitle="Saúde Coletiva e Políticas Públicas em Saúde (20070)"
            time="00:00 - 23:59"
            date={new Date('2025-05-11')}
          />
          <EventCard
            title="Avaliação II - Coletiva"
            subtitle="Saúde Coletiva e Políticas Públicas em Saúde (20070)"
            time="10:00 - 18:00"
            date={new Date('2025-05-12')}
          />
        </>
      ) : isSameDay(selectedDate, sampleDate) ? (
        <>
          <EventCard
            title="Avaliação II - Individual"
            subtitle="Saúde Coletiva e Políticas Públicas em Saúde (20070)"
            time="00:00 - 23:59"
            date={sampleDate}  // Passando a data correta
          />
          <EventCard
            title="Avaliação Final (Discursiva) - Individual"
            subtitle="Saúde Coletiva e Políticas Públicas em Saúde (20070)"
            time="00:00 - 23:59"
            date={sampleDate}  // Passando a data correta
          />
        </>
      ) : isSameDay(selectedDate, otherSampleDate) ? (
        <>
          <EventCard
            title="Avaliação III - Coletiva"
            subtitle="Saúde Coletiva e Políticas Públicas em Saúde (20070)"
            time="09:00 - 16:00"
            date={otherSampleDate}
          />
        </>
      ) : (
        <Text className="text-center text-gray-500">Nenhum evento para esta data.</Text>
      )}
    </View>
  );
};
