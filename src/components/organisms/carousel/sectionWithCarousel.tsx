import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PrimaryTitle } from '../../atoms/title/primaryTitle';
import CardAuthorizationAtom from '../../atoms/card/cardAuthorizationAtom';
import { Authorization } from '../../../../types/authorizations';
import Animated, { FadeInRight } from 'react-native-reanimated';

interface CarouselItem {
  id?: string;
  rawData: Authorization;
}

type Props = {
  data: CarouselItem[];
  title: string;
  linkText: string;
  onPressLink: () => void;
};

export const SectionWithCarousel = ({
  data,
  title,
  linkText,
  onPressLink,
}: Props) => {
  return (
    <View className="mt-6 px-4">
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center space-x-2">
          <Feather name="file-text" size={20} color="#3B82F6" />
          <PrimaryTitle name={title} className="text-xl font-extrabold text-gray-800 tracking-tight" />
        </View>

        <TouchableOpacity
          onPress={onPressLink}
          className="flex-row items-center bg-blue-50 px-3 py-1 rounded-full shadow-sm"
        >
          <Text className="text-sm font-semibold text-blue-600 mr-1">{linkText}</Text>
          <Feather name="arrow-right" size={16} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={data}
        keyExtractor={(item, index) => item.id ?? `carousel-item-${index}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 16, paddingBottom: 8, paddingTop: 2 }}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInRight.delay(index * 100).duration(300)}>
            <CardAuthorizationAtom
              authorization={item.rawData}
              className="w-[260px] transition-all duration-300 active:scale-95"
            />
          </Animated.View>
        )}
      />
    </View>
  );
};
