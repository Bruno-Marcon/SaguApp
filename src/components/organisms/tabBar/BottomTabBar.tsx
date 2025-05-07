import React, { useState } from "react";
import { View, TouchableOpacity, Modal, Text, TextInput, Button } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { TabItem } from "../../molecules/tab/tabItens";

export default function BottomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newOccurrence, setNewOccurrence] = useState("");

  const tabs = [
    { label: "Home", icon: "home" as keyof typeof Feather.glyphMap, route: "/home" },
    { label: "Search", icon: "search" as keyof typeof Feather.glyphMap, route: "/search" },
    { label: "History", icon: "clock" as keyof typeof Feather.glyphMap, route: "/history" },
    { label: "Profile", icon: "user" as keyof typeof Feather.glyphMap, route: "/profile" },
  ];

  const handleInclude = () => {
    // Aqui você pode adicionar lógica para salvar ou processar a nova ocorrência
    console.log("Nova ocorrência:", newOccurrence);
    setNewOccurrence(""); // Limpa o campo de texto
    setIsModalVisible(false); // Fecha o modal
  };

  return (
    <View className="flex-row justify-around items-center bg-white rounded-t-2xl p-4 shadow-md shadow-black/10">
      {tabs.slice(0, 2).map((tab) => (
        <TabItem
          key={tab.label}
          icon={tab.icon}
          label={tab.label}
          route={tab.route}
          active={pathname.startsWith(tab.route)}
        />
      ))}
      
      {/* Botão incluir */}
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}  // Abre o modal
        className="bg-green-500 p-4 rounded-full -mt-10 shadow-lg shadow-green-300"
      >
        <Feather name="plus" color="white" size={24} />
      </TouchableOpacity>

      {tabs.slice(2).map((tab) => (
        <TabItem
          key={tab.label}
          icon={tab.icon}
          label={tab.label}
          route={tab.route}
          active={pathname.startsWith(tab.route)}
        />
      ))}

      {/* Modal para incluir ocorrência */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg w-80 shadow-lg">
            <Text className="text-xl font-semibold mb-4 text-gray-700">Incluir Ocorrência</Text>
            
            {/* Campo para nova ocorrência */}
            <TextInput
              value={newOccurrence}
              onChangeText={setNewOccurrence}
              placeholder="Digite a descrição"
              className="border p-4 rounded-md mb-4 border-gray-300 shadow-sm"
              style={{ minHeight: 100 }}
            />
            
            {/* Botões para ações */}
            <View className="flex-row justify-between">
              <Button 
                title="Cancelar" 
                onPress={() => setIsModalVisible(false)} 
                color="gray"
              />
              <Button 
                title="Incluir" 
                onPress={handleInclude} 
                color="green"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
