import { Student } from "../../../types/students";
import { api, endpoints } from "../api/api";


export const getAllStudents = async (): Promise<Student[]> => {
  return await api.get(endpoints.students.root);
};

export const getStudentById = async (id: string): Promise<Student> => {
  return await api.get(endpoints.students.show(id));
};
