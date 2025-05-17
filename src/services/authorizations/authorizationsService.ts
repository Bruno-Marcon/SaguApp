// src/services/authorization/authorizationService.ts
import { AuthorizationResponse, SingleAuthorizationResponse, UpdateAuthorizationPayload } from '../../../types/authorizations';
import { api} from '../api/api';
import { endpoints } from '../endpoints';


export const authorizationService = {
  getAll: async (page = 1): Promise<AuthorizationResponse> => {
    const response = await api.get(`${endpoints.authorizations.root}?page[number]=${page}`);
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
};
