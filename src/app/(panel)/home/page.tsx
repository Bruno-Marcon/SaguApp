import { View,ScrollView} from 'react-native';
import DefaultNavBar from '@//components/organisms/navbar/defaultNav';
import TitleSection from '@//components/molecules/titleSection/titleSection';
import CountCard from '@//components/organisms/card/card';
import MenuGrid from '@//components/organisms/grid/menuGrid';
import TemplateScreen from '@//components/templates/scrollView/templateScreen';


export default function HomeScreen() {
    return (
      <TemplateScreen>
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
        <MenuGrid item={[]}/>
      </TemplateScreen>
    );
  }