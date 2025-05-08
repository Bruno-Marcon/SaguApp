import { ScrollView } from 'react-native';
import TemplateScreen from '../../../components/templates/scrollView/templateScreen';
import OccurrencesHeader from '@//components/organisms/header/occurrencesHeader';
import OccurrencesFilter from '@//components/organisms/filter/occurrencesFilter';
import OccurrencesList from '@//components/organisms/list/occurencesList';

export default function OccurrencesPage() {
  return (
    <TemplateScreen>
      <ScrollView className="flex-1 px-4 pt-4">
        <OccurrencesHeader />
        <OccurrencesFilter />
        <OccurrencesList />
      </ScrollView>
    </TemplateScreen>
  );
}