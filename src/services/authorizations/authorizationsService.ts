import {
  AuthorizationFilters,
  AuthorizationResponse,
  SingleAuthorizationResponse,
  UpdateAuthorizationPayload,
  CreateAuthorizationPayload,
} from '../../../types/authorizations';
import { api } from '../api/api';
import { endpoints } from '../endpoints';

export const authorizationService = {
  getAll: async (filters: AuthorizationFilters = {}): Promise<AuthorizationResponse> => {
    const params = new URLSearchParams();

    if (filters.page) params.append('page[number]', filters.page.toString());
    if (filters.status) params.append('filter[status]', filters.status);
    if (filters.student_id) params.append('filter[student_id]', filters.student_id);

    const response = await api.get(`${endpoints.authorizations.root}?${params.toString()}`);
    return response;
  },

  getById: async (id: string): Promise<SingleAuthorizationResponse> => {
    const response = await api.get(endpoints.authorizations.show(id));
    return response;
  },

  getByStudentId: async (
    studentId: string,
    page = 1,
    pageSize = 5
  ): Promise<AuthorizationResponse> => {
    const response = await api.get(
      `${endpoints.authorizations.root}?filter[student_id]=${studentId}&page[number]=${page}&page[size]=${pageSize}`
    );
    return response;
  },

  update: async (
    id: string,
    payload: UpdateAuthorizationPayload
  ): Promise<SingleAuthorizationResponse> => {
    const response = await api.patch(`${endpoints.authorizations.root}/${id}`, payload);
    return response;
  },

  updateStatus: async (
    id: string,
    newStatus: 'pending' | 'approved' | 'refused'
  ): Promise<SingleAuthorizationResponse> => {
    const payload = {
      status: newStatus,
    };

    const response = await api.patch(endpoints.authorizations.show(id), payload);
    return response;
  },

  createAuthorization: async (
    payload: CreateAuthorizationPayload
  ): Promise<SingleAuthorizationResponse> => {
    const response = await api.post(endpoints.authorizations.root, payload);
    return response.data;
  },
};
