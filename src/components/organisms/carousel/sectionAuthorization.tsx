import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PrimaryTitle } from '../../atoms/title/primaryTitle';
import CardAuthorizationAtom from '../../atoms/card/cardAuthorizationAtom';
import { Authorization } from '../../../../types/authorizations';

interface CarouselItem {
  id?: string;
  rawData: Authorization;
}

type Props = {
  data: CarouselItem[];
  title: string;
  linkText: string;
  onPressLink: () => void;
  onCardPress?: (authorization: Authorization) => void;
};

export const SectionAuthorization = ({
  data,
  title,
  linkText,
  onPressLink,
  onCardPress,
}: Props) => {
  const pendingItems = data
    .filter((item) => item.rawData.attributes.status === 'pending')
    .sort(
      (a, b) =>
        new Date(b.rawData.attributes.created_at).getTime() -
        new Date(a.rawData.attributes.created_at).getTime()
    )
    .slice(0, 3);

  return (
    <View className="mt-6 px-4">
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row gap-x-2 items-center">
          <Feather name="file-text" size={20} color="#3B82F6" />
          <PrimaryTitle
            name={title}
            className="text-xl font-extrabold text-gray-800 dark:text-white tracking-tight"
          />
        </View>

        <TouchableOpacity
          onPress={onPressLink}
          className="flex-row items-center bg-blue-50 dark:bg-neutral-800 px-3 py-1 rounded-full shadow-sm"
        >
          <Text className="text-sm font-semibold text-blue-600 dark:text-blue-400 mr-1">
            {linkText}
          </Text>
          <Feather name="arrow-right" size={16} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      {pendingItems.length === 0 ? (
        <Text className="text-sm text-gray-500 dark:text-gray-400 italic px-1">
          Nenhuma autorização pendente no momento.
        </Text>
      ) : (
        <FlatList
          horizontal
          data={pendingItems}
          keyExtractor={(item, index) => item.id ?? `carousel-item-${index}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16, paddingBottom: 8, paddingTop: 2 }}
          renderItem={({ item }) => (
            <View>
              <CardAuthorizationAtom
                authorization={item.rawData}
                onPress={() => onCardPress?.(item.rawData)}
                className="w-[260px] transition-all duration-300 active:scale-95"
              />
            </View>
          )}
        />
      )}
    </View>
  );
};
