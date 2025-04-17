import { View, ScrollView} from 'react-native';
import { CircleCheck as CheckCircle2, CircleAlert as AlertCircle, BookOpen, Users, Clock } from 'lucide-react-native';
import DefaultNavBar from '@//components/organisms/navbar/defaultNav';
import TemplateScreen from '@//components/templates/scrollView/templateScreen';
import SectionTableList from '@//components/molecules/section/table/sectionTableList';
import ApresentationSectionWithStatus from '@//components/molecules/section/apresentation/apresentationSectionWithStatus';
import GradesList from '@//components/molecules/grades/gradesList'
import CommunicationSection from '@//components/molecules/section/comunications/sectionComunication';
import AttendanceSection from '@//components/molecules/section/attendance/sectionAttendance';

const grades = [
  { subject: "Matemática", grade: "8.5" },
  { subject: "Português", grade: "9.0" },
  { subject: "História", grade: "8.0" },
];

const comunicados = [
  {
    icon: <AlertCircle size={20} color="#DC2626" />,
    title: "Reunião de Pais",
    subtitle: "Quinta-feira, 15 de Março às 19h",
  },
  {
    icon: <Clock size={20} color="#1E40AF" />,
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
      <DefaultNavBar />
      <ScrollView className="flex-1">
      <ApresentationSectionWithStatus
          apresentationProps={{
            title: "Olá Bruno Marcon",
            subtitle: "Seja muito bem-vindo ao App Sagu",
          }}
          statusCards={[
            {
              icon: <BookOpen size={24} color="#1E40AF" />,
              title: "Próxima Aula",
              subtitle: "Matemática - 10:00",
            },
            {
              icon: <CheckCircle2 size={24} color="#059669" />,
              title: "Presença Hoje",
              subtitle: "Presente",
            },
            {
              icon: <Users size={24} color="#1E40AF" />,
              title: "Reunião",
              subtitle: "15:00 - Coordenação",
            },
          ]}
        />
        <View className="p-5">
          <SectionTableList
            title="Desempenho Acadêmico"
            linkText="Ver boletim"
            href="/"
          />
        <GradesList grades={grades} />
        </View>

        <View className="p-5">
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


