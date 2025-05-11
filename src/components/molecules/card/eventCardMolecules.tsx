import { View } from 'react-native'
import { TextAtom } from '../../atoms/text/textAtom'


type Props = {
  title: string
  subtitle: string
  time: string
}

export const EventCard = ({ title, subtitle, time }: Props) => (
  <View className="bg-white rounded-md p-5 border-l-4 border-green-500 my-2">
    <TextAtom variant="title">{title}</TextAtom>
    <TextAtom variant="body" className="text-black mt-1">{subtitle}</TextAtom>
    <TextAtom variant="body" className="text-red-500 mt-1 text-sm">00:00 - {time}</TextAtom>
  </View>
)
