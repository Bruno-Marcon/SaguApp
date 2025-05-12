import TemplateScreen from '../scrollView/templateScreen'
import { CustomCalendar } from '../../organisms/card/customCalendarOrganism'



export const CalendarScreenTemplate = () => (
  <TemplateScreen withHeader={false}> 
    <CustomCalendar />
  </TemplateScreen>
)
