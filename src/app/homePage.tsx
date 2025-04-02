import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { Bell } from 'lucide-react-native';
import { Link } from 'expo-router';

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
      <ScrollView className="flex-1 bg-white">
        <View className="flex-1 px-4 pt-12">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-8">
            <Image
              source={require('../assets/images/logo-ifc.png')}
              className="w-16 h-16"
              resizeMode="contain"
            />
            <View className="flex-row items-center gap-4">
              <Bell className="text-gray-600" />
              <View className="w-10 h-10 rounded-full bg-gray-200">
                <Image
                  source={{ uri: 'https://github.com/diego3g.png' }}
                  className="w-10 h-10 rounded-full"
                />
              </View>
            </View>
          </View>
  
          {/* Welcome */}
          <View className="mb-8">
            <Text className="text-2xl font-bold">
              Bem-vindo, <Text className="text-primary">Bruno</Text>
            </Text>
            <Text className="text-gray-600 mt-1">Confira suas informações acadêmicas</Text>
          </View>
  
          {/* Attendance Card */}
          <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
            <Text className="text-lg font-semibold mb-4">Frequência</Text>
            
            <View className="flex-row justify-between items-center">
              <View className="items-center">
                <Text className="text-2xl font-bold text-primary">0</Text>
                <Text className="text-gray-600">presenças</Text>
              </View>
              
              <View className="items-center">
                <Text className="text-2xl font-bold text-red-500">0</Text>
                <Text className="text-gray-600">ausências</Text>
              </View>
              
              <View className="items-center">
                <Text className="text-2xl font-bold text-blue-500">0</Text>
                <Text className="text-gray-600">aulas</Text>
              </View>
  
              <View className="items-center justify-center w-12 h-12 rounded-full bg-green-100">
                <Text className="text-primary font-bold">100%</Text>
              </View>
            </View>
  
            <Text className="text-gray-500 text-sm mt-4">informações até 00/00</Text>
          </View>
  
          {/* Menu Grid
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
          </View> */}
        </View>
      </ScrollView>
    );
  }