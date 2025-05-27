import { Class } from '../../../types/class';
import { api } from '../api/api';
import { endpoints } from '../endpoints';

interface ClassResponse {
  data: Class[];
  meta?: any;
  links?: any;
}

export const classroomService = {
  getClassrooms: async (): Promise<ClassResponse> => {
    const response = await api.get(endpoints.classrooms.root);
    return response as ClassResponse;
  }
};
