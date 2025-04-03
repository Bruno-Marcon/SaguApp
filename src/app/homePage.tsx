import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import DefaultNavBar from '../components/organisms/navbar/defaultNav';
import PrimaryTitle from '../components/atoms/title/primaryTitle';
import { SubTitle } from '../components/atoms/subtitle/subtitle';
import TitleSection from '../components/molecules/titleSection/titleSection';
import SubTitleSemiBold from '../components/atoms/subtitle/subtitleSemiBold';
import CounterCard from '../components/molecules/counterCard/counterCard';
import CountCard from '../components/organisms/card/card';

const MENU_ITEMS = [
    {
      id: 1,
      title: 'Calendário acadêmico',
      icon: '📅',
      href: '/calendar',
    },
    {
      id: 2,
      title: 'Notas',
      icon: '📝',
      href: '/notes',
    },
    {
      id: 3,
      title: 'Ocorrências',
      icon: '⚠️',
      href: '/occurrences',
    },
    {
      id: 4,
      title: 'Horários',
      icon: '⏰',
      href: '/schedule',
    },
    {
      id: 5,
      title: 'Biblioteca',
      icon: '📚',
      href: '/library',
    },
    {
      id: 6,
      title: 'Documentos',
      icon: '📄',
      href: '/documents',
    },
  ];

export default function HomeScreen() {
    return (
      <ScrollView className="flex-1 bg-gray-100">
        <View className="flex-1 px-4 pt-12">
          {/* Header */}
          <DefaultNavBar/>
          {/* Welcome */}
          <TitleSection title='Bem vindo, Bruno' subtitle='Confira suas informações academicas'/>
          {/* Attendance Card */}
          <CountCard
            title="Resumo de Presenças"
            info="Informações até 03/04"
            number='100%'
            counts={[
              { count: "20", label: "Presenças", colorClass: "text-blue-600" },
              { count: "3", label: "Faltas", colorClass: "text-red-600" },
              { count: "8", label: "Envios", colorClass: "text-green-600" },
            ]}
          />
  
          Menu Grid
          <View className="flex-row flex-wrap justify-between gap-y-4">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                asChild
              >
                <Pressable className="w-[31%] aspect-square bg-gray-50 rounded-xl items-center justify-center">
                  <Text className="text-2xl mb-2">{item.icon}</Text>
                  <Text className="text-xs text-center text-gray-600">{item.title}</Text>
                </Pressable>
              </Link>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }