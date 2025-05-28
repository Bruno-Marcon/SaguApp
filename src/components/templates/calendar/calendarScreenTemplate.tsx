import { useEffect, useState } from 'react';
import TemplateScreen from '../scrollView/templateScreen';
import { CustomCalendar } from '../../organisms/card/customCalendarOrganism';
import { CustomCalendarSkeleton } from '../../Skeleton/customCalendarSkeleton';

export const CalendarScreenTemplate = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <TemplateScreen withHeader={false}>
      {loading ? <CustomCalendarSkeleton /> : <CustomCalendar />}
    </TemplateScreen>
  );
};
