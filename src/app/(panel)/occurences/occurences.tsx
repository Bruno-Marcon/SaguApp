import { ScrollView } from 'react-native';
import TemplateScreen from '../../../components/templates/scrollView/templateScreen';
import OccurrencesFilter from '@//components/organisms/filter/occurrencesFilter';
import OccurrencesList from '@//components/organisms/list/occurencesList';
import { OccurrencesHeader } from '@//components/organisms/header/occurrencesHeader';
import { useRouter } from 'expo-router';

export default function OccurrencesPage() {
  const router = useRouter();

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <TemplateScreen withHeader={false}>
      <ScrollView className="flex-1 px-4 pt-4">
        <OccurrencesHeader 
          showBackButton={true}
          onBackPress={handleBackPress}
        />
        <OccurrencesFilter />
        <OccurrencesList />
      </ScrollView>
    </TemplateScreen>
  );
}