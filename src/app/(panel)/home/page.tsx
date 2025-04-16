import { View, Text, ScrollView,TouchableOpacity} from 'react-native';
import { Link } from 'expo-router';
import { CircleCheck as CheckCircle2, CircleAlert as AlertCircle, ChevronRight, BookOpen, Users, Clock } from 'lucide-react-native';
import DefaultNavBar from '@//components/organisms/navbar/defaultNav';
import TemplateScreen from '@//components/templates/scrollView/templateScreen';
import ApresentationSection from '@//components/molecules/titleSection/apresentationSection';
import StatusCard from '@//components/organisms/card/card';


export default function HomePage() {

  return (
    <TemplateScreen>
      <DefaultNavBar />
      <ScrollView className="flex-1">
        <View className="p-5 bg-green-600">
        <ApresentationSection title={'Olá Bruno Marcon'} subtitle={'Seja muito bem vindo ao App Sagu'}/>
          <View className="flex-row justify-between mt-5">
            <StatusCard icon={<BookOpen size={24} color="#1E40AF"/> } title={'Próxima Aula'} subtitle={'Matemática - 10:00'}/>
            <StatusCard icon={<CheckCircle2 size={24} color="#059669" />} title={'Presença Hoje'} subtitle={'Presente'}/>
            <StatusCard icon={<Users size={24} color="#1E40AF" />} title={'Reunião'} subtitle={'15:00 - Coordenação'}/>
          </View>
        </View>

        {/* Academic Performance */}
        <View className="p-5">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-gray-800">Desempenho Acadêmico</Text>
            {/* <Link  asChild>
              <TouchableOpacity className="flex-row items-center">
                <Text className="text-sm text-blue-900 mr-1">Ver boletim</Text>
                <ChevronRight size={20} color="#1E40AF" />
              </TouchableOpacity>
            </Link> */}
          </View>

          <View className="bg-white rounded-xl p-4">
            {['Matemática', 'Português', 'História'].map((subject, index) => (
              <View key={index} className="flex-row justify-between items-center py-2 border-b border-gray-200">
                <Text className="text-base text-gray-800">{subject}</Text>
                <Text className="text-base font-semibold text-green-600">{['8.5', '9.0', '8.0'][index]}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Notices */}
        <View className="p-5">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-gray-800">Comunicados Recentes</Text>
            {/* <Link href="/notifications" asChild>
              <TouchableOpacity className="flex-row items-center">
                <Text className="text-sm text-blue-900 mr-1">Ver todos</Text>
                <ChevronRight size={20} color="#1E40AF" />
              </TouchableOpacity>
            </Link> */}
          </View>

          <View className="bg-white rounded-xl p-4">
            <View className="flex-row items-center mb-4">
              <AlertCircle size={20} color="#DC2626" />
              <View className="ml-3 flex-1">
                <Text className="text-base font-medium text-gray-800">Reunião de Pais</Text>
                <Text className="text-sm text-gray-500 mt-1">Quinta-feira, 15 de Março às 19h</Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <Clock size={20} color="#1E40AF" />
              <View className="ml-3 flex-1">
                <Text className="text-base font-medium text-gray-800">Alteração no Horário</Text>
                <Text className="text-sm text-gray-500 mt-1">Aulas de Educação Física alteradas para terça-feira</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Attendance */}
        <View className="p-5">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-gray-800">Frequência</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-sm text-blue-900 mr-1">Ver detalhes</Text>
              <ChevronRight size={20} color="#1E40AF" />
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-xl p-4">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-base text-gray-800">Presença Total</Text>
              <Text className="text-xl font-semibold text-green-600">95%</Text>
            </View>
            <View className="h-2 bg-gray-200 rounded-full">
              <View className="h-full bg-green-600 rounded-full" style={{ width: '95%' }} />
            </View>
          </View>
        </View>
      </ScrollView>
    </TemplateScreen>
  );
}
