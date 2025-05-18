// src/services/students/studentService.ts
import { StudentDetailResponse, StudentResponse, UpdateStudentPayload } from '../../../types/students'
import { api } from '../api/api'
import { endpoints } from '../endpoints'


export const studentService = {
  getAll: async (page = 1): Promise<StudentResponse> => {
    const response = await api.get(`${endpoints.students.root}?page[number]=${page}`)
    return response as StudentResponse
  },

  getById: async (id: string): Promise<StudentDetailResponse> => {
    const response = await api.get(endpoints.students.show(id))
    return response as StudentDetailResponse
  },

  update: async (
    student_id: string,
    payload: UpdateStudentPayload
  ): Promise<StudentDetailResponse> => {
    const response = await api.patch(endpoints.students.update(student_id), payload)
    return response as StudentDetailResponse
  },

  getByClassroomId: async (
    classroomId: string,
    page = 1
  ): Promise<StudentResponse> => {
    const response = await api.get(
      `${endpoints.students.root}?filter[classroom_id]=${classroomId}&page[number]=${page}&page[size]=10`
    )
    return response as StudentResponse
  }
}
