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
      student_id: item.relationships.student.data.id,
    })),
  };

  return mapped;
},

  getById: async (id: string): Promise<Occurrence> => {
    return await api.get(`${endpoints.occurrencies.root}/${id}`);
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
        student_id: item.relationships.student.data.id,
      })),
    };

    return mapped;
  },
};