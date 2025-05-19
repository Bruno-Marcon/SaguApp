import {
  AvailableSlotsResponse,
  CreateSchedulePayload,
  ScheduleResponse,
  SingleScheduleResponse,
  UpdateSchedulePayload,
} from "../../../types/schedules";
import { api } from "../api/api";
import { endpoints } from "../endpoints";

export const scheduleService = {
  getSchedules: async (page = 1): Promise<ScheduleResponse> => {
    const query = `?page[number]=${page}`;
    const response = await api.get(`${endpoints.schedules.root}${query}`);
    console.log("[SCHEDULE SERVICE] getSchedules → página:", page);
    console.log("[SCHEDULE SERVICE] Agendamentos:", response.data);
    return response;
  },

  getLatestSchedules: async (): Promise<ScheduleResponse> => {
    const response = await api.get(endpoints.schedules.root);
    console.log("[SCHEDULE SERVICE] getLatestSchedules");
    console.log("[SCHEDULE SERVICE] Agendamentos mais recentes:", response.data);
    return response;
  },

  getSchedule: async (id: string): Promise<SingleScheduleResponse> => {
    const response = await api.get(endpoints.schedules.show(id));
    console.log("[SCHEDULE SERVICE] getSchedule → ID:", id);
    console.log("[SCHEDULE SERVICE] Agendamento:", response.data);
    return response;
  },

  getSchedulesByStudentId: async (
    studentId: string,
    page = 1,
    pageSize = 5
  ): Promise<ScheduleResponse> => {
    const query = `?filter[student_id]=${studentId}&page[number]=${page}&page[size]=${pageSize}`;
    const response = await api.get(`${endpoints.schedules.root}${query}`);
    console.log("[SCHEDULE SERVICE] getSchedulesByStudentId → Student ID:", studentId);
    console.log("[SCHEDULE SERVICE] Agendamentos:", response.data);
    return response;
  },

  createSchedule: async (
    payload: CreateSchedulePayload
  ): Promise<SingleScheduleResponse> => {
    console.log("[SCHEDULE SERVICE] createSchedule → Payload:", payload);
    const response = await api.post(endpoints.schedules.create, payload);
    console.log("[SCHEDULE SERVICE] Agendamento criado:", response.data);
    return response;
  },

  updateSchedule: async (
    studentId: string,
    payload: UpdateSchedulePayload
  ): Promise<SingleScheduleResponse> => {
    console.log("[SCHEDULE SERVICE] updateSchedule → Student ID:", studentId);
    console.log("[SCHEDULE SERVICE] Payload:", payload);
    const response = await api.patch(endpoints.schedules.update(studentId), payload);
    console.log("[SCHEDULE SERVICE] Agendamento atualizado:", response.data);
    return response;
  },

  getAvailableSlots: async (
    starts_at: string,
    relatorId?: string
  ): Promise<AvailableSlotsResponse> => {
    const params = new URLSearchParams({ starts_at });
    if (relatorId) params.append("relator_id", relatorId);
    const url = `${endpoints.schedules.availableSlots}?${params.toString()}`;
    const response = await api.get(url);
    console.log("[SCHEDULE SERVICE] getAvailableSlots →", url);
    console.log("[SCHEDULE SERVICE] Horários disponíveis:", response.data);
    return response;
  },
};