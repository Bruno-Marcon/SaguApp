import { View, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import TemplateScreen from '@//components/templates/scrollView/templateScreen';
import SectionTableList from '@//components/molecules/section/table/sectionTableList';
import ApresentationSectionWithStatus from '@//components/molecules/section/apresentation/apresentationSectionWithStatus';
import GradesList from '@//components/molecules/grades/gradesList';
import CommunicationSection from '@//components/molecules/section/comunications/sectionComunication';
import AttendanceSection from '@//components/molecules/section/attendance/sectionAttendance';
import SectionOccurrences from '../../organisms/section/SectionOccurrences';

const grades = [
  { subject: "Matemática", grade: "8.5" },
  { subject: "Português", grade: "9.0" },
  { subject: "História", grade: "8.0" },
];

const ocorrencias = [
  { title: "Falta sem Justificativa", description: "Aluno ausente na aula de Matemática em 20/04" },
  { title: "Indisciplina", description: "Comportamento inadequado durante a aula de História" },
];

const comunicados = [
  {
    icon: <Feather name="alert-circle" size={20} color="#DC2626" />,
    title: "Reunião de Pais",
    subtitle: "Quinta-feira, 15 de Março às 19h",
  },
  {
    icon: <Feather name="clock" size={20} color="#1E40AF" />,
    title: "Alteração no Horário",
    subtitle: "Aulas de Educação Física alteradas para terça-feira",
  },
];

export default function HomePage() {
  const handleLinkPress = () => {
    console.log("Ver detalhes da frequência");
  };

  return (
    <TemplateScreen>
      <ScrollView className="flex-1">
        <ApresentationSectionWithStatus
          apresentationProps={{
            title: "Olá Bruno Marcon",
            subtitle: "Seja muito bem-vindo ao App Sagu",
          }}
          statusCards={[
            {
              iconName: "book-open",
              title: "Próxima Aula",
              subtitle: "Matemática - 10:00",
            },
            {
              iconName: "check-circle",
              title: "Presença Hoje",
              subtitle: "Presente",
            },
            {
              iconName: "users",
              title: "Reunião",
              subtitle: "15:00 - Coordenação",
            },
          ]}
        />
        <View className="p-3">
          <SectionTableList
            title="Desempenho Acadêmico"
            linkText="Ver boletim"
            href="/"
          />
          <GradesList grades={grades} />
        </View>
        <View className="p-3">
          <SectionOccurrences
            sectionTitle="Ocorrências Recentes"
            items={ocorrencias}
          />
        </View>
        <View className="p-3">
          <CommunicationSection
            sectionTitle="Comunicados Recentes"
            items={comunicados}
          />
        </View>
        <AttendanceSection 
          title={'Presença'} 
          percentage={80} 
          linkText="Ver detalhes"
          onPressLink={handleLinkPress}
        />
      </ScrollView>
    </TemplateScreen>
  );
}
