import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import DefaultNavBar from '@//components/organisms/navbar/defaultNav';
import TitleSection from '@//components/molecules/titleSection/titleSection';
import CountCard from '@//components/organisms/card/card';
import MenuGrid from '@//components/organisms/grid/menuGrid';


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
          <DefaultNavBar/>
          <TitleSection title='Bem vindo, Bruno' subtitle='Confira suas informações academicas'/>
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
          {/* <MenuGrid item={}/> */}
        </View>
      </ScrollView>
    );
  }