import { View } from 'react-native';
import { TextAtom } from '../../atoms/text/textAtom';
import { format } from 'date-fns';

type Props = {
  title: string;
  subtitle: string;
  time: string;
  date: Date;  // Adicionada a prop date
};

export const EventCard = ({ title, subtitle, time, date }: Props) => {
  // Função para formatar a data
  const formatDate = (date: Date) => format(date, 'dd/MM/yyyy');

  return (
    <View className="bg-white rounded-md p-5 border-l-4 border-green-500 my-2">
      <TextAtom variant="title">{title}</TextAtom>
      <TextAtom variant="body" className="text-black mt-1">{subtitle}</TextAtom>
      <TextAtom variant="body" className="text-red-500 mt-1 text-sm">
        {`${formatDate(date)} - ${time}`}
      </TextAtom>
    </View>
  );
};
