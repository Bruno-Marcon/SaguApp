import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

type Discipline = {
  name: string;
  grade: number;
  frequency: number;
};

const disciplines: Discipline[] = [
  { name: 'Matemática', grade: 8.5, frequency: 95 },
  { name: 'Português', grade: 9.2, frequency: 98 },
  { name: 'História', grade: 7.8, frequency: 92 },
  { name: 'Geografia', grade: 8.0, frequency: 96 },
  { name: 'Ciências', grade: 9.0, frequency: 99 },
  { name: 'Inglês', grade: 8.7, frequency: 94 },
];

export default function ReportCardSection() {
  const generatePdf = async () => {
    const htmlContent = `
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; color: #111827; }
            h1 { color: #2563EB; }
            table { width: 100%; border-collapse: collapse; margin-top: 24px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #2563EB; color: white; }
            tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1>Boletim Escolar</h1>
          <p>Aluno: João da Silva</p>
          <p>Período: 2024</p>
          <table>
            <tr>
              <th>Disciplina</th>
              <th>Nota</th>
              <th>Frequência (%)</th>
            </tr>
            ${disciplines
              .map(
                (d) => `
              <tr>
                <td>${d.name}</td>
                <td>${d.grade}</td>
                <td>${d.frequency}%</td>
              </tr>
            `
              )
              .join('')}
          </table>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    await Sharing.shareAsync(uri);
  };

  return (
    <View className="border border-gray-200 rounded-2xl px-5 py-5 mb-6 mt-6 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-gray-800">📑 Boletim Escolar</Text>
        <TouchableOpacity
          onPress={generatePdf}
          className="flex-row items-center space-x-1"
        >
          <Feather name="download" size={18} color="#2563EB" />
          <Text className="text-sm font-semibold text-blue-600">Exportar</Text>
        </TouchableOpacity>
      </View>

      {/* Table Header */}
      <View className="flex-row bg-gray-50 rounded-lg px-4 py-2 mb-2">
        <Text className="flex-1 text-xs text-gray-500">Disciplina</Text>
        <Text className="w-16 text-xs text-gray-500 text-center">Nota</Text>
        <Text className="w-20 text-xs text-gray-500 text-right">Frequência</Text>
      </View>

      {/* Table Body */}
      <ScrollView>
        {disciplines.map((item, index) => (
          <View
            key={item.name}
            className={`flex-row px-4 py-3 items-center rounded-xl ${
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            }`}
          >
            <Text className="flex-1 text-sm text-gray-800">{item.name}</Text>
            <View
              className={`w-16 py-1 rounded-full ${
                item.grade >= 7 ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <Text
                className={`text-center text-sm font-semibold ${
                  item.grade >= 7 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {item.grade.toFixed(1)}
              </Text>
            </View>
            <Text
              className={`w-20 text-sm text-right ${
                item.frequency >= 90 ? 'text-green-600' : 'text-yellow-600'
              }`}
            >
              {item.frequency}%
            </Text>
          </View>
        ))}
      </ScrollView>

      <View className="mt-4">
        <Text className="text-xs text-gray-500">
          📥 Toque em "Exportar" para gerar seu boletim em PDF.
        </Text>
      </View>
    </View>
  );
}
