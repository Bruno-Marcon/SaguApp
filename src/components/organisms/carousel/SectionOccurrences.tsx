import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import CardAtom from '../../atoms/card/cardAtom'
import { Occurrence } from '../../../../types/occurrence'

type UpdateData = {
  responsible_id?: string;
  status?: string;
  kind?: string;
  severity?: string;
};

type Props = {
  data: Occurrence[];
  title: string;
  linkText: string;
  onPressLink: () => void;
  onCardPress?: (occurrence: Occurrence) => void;
  loading?: boolean;
  onUpdate?: (id: string, data: UpdateData) => Promise<void>;
  responsibleId?: string; // novo prop para passar responsible_id dinâmico
}

export const SectionOccurrences = ({
  data,
  title,
  linkText,
  onPressLink,
  onCardPress,
  loading = false,
  onUpdate,
  responsibleId,
}: Props) => {
  const filteredOccurrences = data.filter(
    (o) => !o.attributes.status || o.attributes.status !== 'closed'
  )

  const latestOccurrences = [...filteredOccurrences]
    .sort(
      (a, b) =>
        new Date(b.attributes.created_at).getTime() - new Date(a.attributes.created_at).getTime()
    )
    .slice(0, 3)

  if (loading) {
    return (
      <View className="mt-6 px-4 flex-row justify-center items-center" style={{ height: 120 }}>
        <ActivityIndicator size="large" color="#EF4444" />
      </View>
    )
  }

  return (
    <View className="mt-6 px-4 z-0 overflow-visible">
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center gap-x-2">
          <Feather name="alert-circle" size={20} color="#F87171" />
          <Text className="text-xl font-extrabold text-gray-800 tracking-tight">{title}</Text>
        </View>
        <TouchableOpacity
          onPress={onPressLink}
          className="flex-row items-center bg-green-50 px-3 py-1 rounded-full"
        >
          <Text className="text-sm font-semibold text-green-600 mr-1">{linkText}</Text>
          <Feather name="arrow-right" size={16} color="#16A34A" />
        </TouchableOpacity>
      </View>

      {latestOccurrences.length === 0 ? (
        <Text className="text-sm text-gray-500 italic px-1">Nenhuma ocorrência aberta no momento.</Text>
      ) : (
        <FlatList
          data={latestOccurrences}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 16,
            paddingBottom: 8,
            paddingTop: 2,
          }}
          style={{ zIndex: 0, overflow: 'visible' }}
          renderItem={({ item }) => (
            <View>
              <CardAtom
                occurrence={item}
                onPress={() => onCardPress?.(item)}
                className="w-[260px] transition-all duration-300 active:scale-95"
              />
              {onUpdate && responsibleId && (
                <TouchableOpacity
                  style={{
                    marginTop: 8,
                    backgroundColor: '#EF4444',
                    paddingVertical: 6,
                    borderRadius: 6,
                    alignItems: 'center',
                  }}
                  onPress={() =>
                    onUpdate(item.id, {
                      responsible_id: responsibleId,
                      status: 'closed',
                      kind: item.attributes.kind,
                      severity: item.attributes.severity,
                    })
                  }
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    Marcar como Resolvida
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      )}
    </View>
  )
}
