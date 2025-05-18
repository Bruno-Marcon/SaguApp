import { Occurrence, OccurrenceFilters, OccurrenceResponse } from "../../../types/occurrence";
import { api } from "../api/api";
import { endpoints } from "../endpoints";

export const occurrenceService = {
  getAll: async (filters: OccurrenceFilters = {}): Promise<OccurrenceResponse> => {
    const params = new URLSearchParams();

    if (filters.page) params.append('page[number]', filters.page.toString());
    if (filters.severity) params.append('filter[severity]', filters.severity);
    if (filters.status) params.append('filter[status]', filters.status);
    if (filters.student_id) params.append('filter[student_id]', filters.student_id);

    const response = await api.get(`${endpoints.occurrencies.root}?${params.toString()}`);

    const mapped = {
      ...response,
      data: response.data.map((item: any): Occurrence => ({
        id: item.id,
        title: item.attributes.title,
        description: item.attributes.description,
        created_at: item.attributes.created_at,
        kind: item.attributes.kind,
        status: item.attributes.status,
        severity: item.attributes.severity,
        student_id: item.relationships?.student?.data?.id ?? '',
      })),
    };

    return mapped;
  },

  getById: async (id: string): Promise<Occurrence> => {
    const response = await api.get(`${endpoints.occurrencies.root}/${id}`);

    const item = response.data;
    const included = response.included || [];

    const studentId = item.relationships?.student?.data?.id;
    const relatorId = item.relationships?.relator?.data?.id;
    const responsibleId = item.relationships?.responsible?.data?.id;

    const student = included.find((i: any) => i.type === 'student' && i.id === studentId);
    const relator = included.find((i: any) => i.type === 'user' && i.id === relatorId);
    const responsible = included.find((i: any) => i.type === 'user' && i.id === responsibleId);

    const mapped: Occurrence = {
      id: item.id,
      title: item.attributes.title,
      description: item.attributes.description,
      created_at: item.attributes.created_at,
      kind: item.attributes.kind,
      status: item.attributes.status,
      severity: item.attributes.severity,
      student_id: studentId ?? '',
      student_name: student?.attributes?.name ?? '',
      relator_name: relator?.attributes?.name ?? '',
      responsible_name: responsible?.attributes?.name ?? '',
    };

    return mapped;
  },

  getByStudentId: async (
    studentId: string,
    page = 1,
    pageSize = 5
  ): Promise<OccurrenceResponse> => {
    const response = await api.get(
      `${endpoints.occurrencies.root}?filter[student_id]=${studentId}&page[number]=${page}&page[size]=${pageSize}`
    );

    const mapped = {
      ...response,
      data: response.data.map((item: any): Occurrence => ({
        id: item.id,
        title: item.attributes.title,
        description: item.attributes.description,
        created_at: item.attributes.created_at,
        kind: item.attributes.kind,
        status: item.attributes.status,
        severity: item.attributes.severity,
        student_id: item.relationships?.student?.data?.id ?? '',
      })),
    };

    return mapped;
  },
};
