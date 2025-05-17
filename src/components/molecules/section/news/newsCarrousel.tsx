import { useEffect, useState } from 'react'
import { View, Text, FlatList, Dimensions } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { News } from '../../../../../types/news'
import { newsService } from '@//services/news/newsService'

const screenHeight = Dimensions.get('window').height

export default function NewsCarousel() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newsService.getNews()
        setNews(response.data)
      } catch (error) {
        console.error('Erro ao buscar comunicados:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const renderItem = ({ item }: { item: News }) => {
    const { title, content, date } = item.attributes

    return (
      <Animated.View
        entering={FadeInDown}
        className="bg-white mb-4 rounded-2xl p-5 mx-2 border border-gray-100"
        style={{ height: screenHeight * 0.15 }}
        >
        <View className="flex-row items-center gap-x-2 mb-2">
            <Feather name="volume-2" size={20} color="#15803D" />
            <Text className="text-base font-bold text-gray-800 flex-1" numberOfLines={1}>
            {title}
            </Text>
        </View>

        <Text className="text-sm text-gray-600 mb-3 leading-snug" numberOfLines={3}>
            {content}
        </Text>

        <View className="flex-row items-center mt-auto">
            <Feather name="calendar" size={14} color=" #F87171" />
            <Text className="ml-2 text-xs text-gray-400">
            {format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </Text>
        </View>
        </Animated.View>
    )
  }

  return (
    <View className="px-4 py-4">
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center gap-x-2">
          <Feather name="volume-2" size={18} color="#4B5563" />
          <Text className="text-xl font-extrabold text-gray-800 tracking-tight">Comunicados</Text>
        </View>
      </View>

      {loading ? (
        <Text className="text-center text-sm text-gray-500 mt-4">Carregando...</Text>
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      )}
    </View>
  )
}
