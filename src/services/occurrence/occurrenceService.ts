import {
  CreateOccurrencePayload,
  OccurrenceFilters,
  OccurrenceResponse,
  SingleOccurrenceResponse,
  updateOccurrencePayload,
  Occurrence,
  
} from '../../../types/occurrence';
import { IncludedEvent, IncludedStudent, IncludedUser } from '../../../types/share';
import { api } from '../api/api';
import { endpoints } from '../endpoints';

function enrichOccurrenceWithNames(
  occurrence: Occurrence,
  included: Array<IncludedUser | IncludedStudent | IncludedEvent> = []
): Occurrence & {
  student_name?: string;
  responsible_name?: string;
  relator_name?: string;
} {
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

export const occurrenceService = {
  getLatestOccurrences: async (): Promise<any> => {
    const response = await api.get(endpoints.dashboard.occurrences);
    return response;
  },

  getOccurrencies: async (filters: OccurrenceFilters = {}): Promise<OccurrenceResponse> => {
    const params = new URLSearchParams();

    if (filters.page) params.append('page[number]', filters.page.toString());
    if (filters.severity) params.append('filter[severity]', filters.severity);
    if (filters.status) params.append('filter[status]', filters.status);

    const response = await api.get(`${endpoints.occurrencies.root}?${params.toString()}`);
    return response;
  },

  getOccurrenciesByStudentId: async (
    studentId: string,
    page = 1,
    pageSize = 5
  ): Promise<OccurrenceResponse> => {
    const response = await api.get(
      `${endpoints.occurrencies.root}?filter[student_id]=${studentId}&page[number]=${page}&page[size]=${pageSize}`
    );
    return response;
  },

  // Aqui aplicamos o enriquecimento para ter os nomes
  getOccurrency: async (id: string): Promise<Occurrence & {
    student_name?: string;
    responsible_name?: string;
    relator_name?: string;
  }> => {
    const response: SingleOccurrenceResponse = await api.get(`${endpoints.occurrencies.root}/${id}`);
    const occurrence = response.data;
    const included = response.included || [];

    return enrichOccurrenceWithNames(occurrence, included);
  },

  createOccurrence: async (payload: CreateOccurrencePayload): Promise<SingleOccurrenceResponse> => {
    const response = await api.post(endpoints.occurrencies.root, payload);
    return response;
  },

  updateOccurrence: async (
    id: string,
    data: updateOccurrencePayload
  ): Promise<SingleOccurrenceResponse> => {
    const payload: any = {
      data: {
        type: 'occurrency',
        id,
        attributes: {},
        relationships: {},
      },
    };

    if (data.kind !== undefined) payload.data.attributes.kind = data.kind;
    if (data.status !== undefined) payload.data.attributes.status = data.status;
    if (data.severity !== undefined) payload.data.attributes.severity = data.severity;
    if (data.private !== undefined) payload.data.attributes.private = data.private;

    if (data.responsible_id) {
      payload.data.relationships.responsible = {
        data: {
          type: 'user',
          id: data.responsible_id,
        },
      };
    }

    const response = await api.patch(`${endpoints.occurrencies.root}/${id}`, payload);
    return response;
  },
};
