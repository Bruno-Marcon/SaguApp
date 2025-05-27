import { Occurrence } from "../../types/occurrence";
import { IncludedEvent, IncludedStudent, IncludedUser } from "../../types/share";


export function enrichOccurrenceWithNames(
  occurrence: Occurrence,
  included: Array<IncludedUser | IncludedStudent | IncludedEvent> = []
): Occurrence & { student_name?: string; responsible_name?: string; relator_name?: string } {
  const studentId = occurrence.relationships.student.data.id;
  const responsibleId = occurrence.relationships.responsible.data.id;
  const relatorId = occurrence.relationships.relator.data.id;

  const findName = (id: string, type: string) => {
    const entity = included.find(i => i.id === id && i.type === type);
    return entity?.attributes?.name ?? '-';
  };

  return {
    ...occurrence,
    student_name: findName(studentId, 'student'),
    responsible_name: findName(responsibleId, 'user'),
    relator_name: findName(relatorId, 'user'),
  };
}
