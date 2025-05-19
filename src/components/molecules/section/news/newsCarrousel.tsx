import { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { News } from '../../../../../types/news'
import { newsService } from '@//services/news/newsService'

const PAGE_SIZE = 2

export default function NewsCarousel() {
  const [allNews, setAllNews] = useState<News[]>([])
  const [visibleNews, setVisibleNews] = useState<News[]>([])
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newsService.getNews()
        setAllNews(response.data)
        setVisibleNews(response.data.slice(0, PAGE_SIZE))
      } catch (error) {
        console.error('Erro ao buscar comunicados:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const handleLoadMore = () => {
    const nextCount = visibleCount + PAGE_SIZE
    setVisibleCount(nextCount)
    setVisibleNews(allNews.slice(0, nextCount))
  }

  const handleShowLess = () => {
    setVisibleCount(PAGE_SIZE)
    setVisibleNews(allNews.slice(0, PAGE_SIZE))
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
        <ActivityIndicator size="small" color="#15803D" className="mt-4" />
      ) : (
        <>
          <ScrollView
            style={{ maxHeight: 300 }} // ✅ altura máxima da seção com scroll
            contentContainerStyle={{ paddingBottom: 8 }}
            showsVerticalScrollIndicator={true}
          >
            {visibleNews.map((item) => {
              const { title, content, date } = item.attributes
              return (
                <View
                  key={item.id}
                  className="bg-white mb-4 rounded-2xl p-5 mx-2 border border-gray-100"
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
                    <Feather name="calendar" size={14} color="#F87171" />
                    <Text className="ml-2 text-xs text-gray-400">
                      {format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </Text>
                  </View>
                </View>
              )
            })}
          </ScrollView>

          {allNews.length > PAGE_SIZE && (
            <TouchableOpacity
              onPress={visibleNews.length >= allNews.length ? handleShowLess : handleLoadMore}
              className="items-center mt-2"
            >
              <Text className="text-green-700 font-semibold">
                {visibleNews.length >= allNews.length ? 'Ver menos' : 'Ver mais'}
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  )
}
