import { api } from '../api/api';
import { endpoints } from '../endpoints';
import { Event, EventsResponse } from '../../../types/event';

export const eventService = {
  getByOccurrenceId: async (occurrenceId: string): Promise<EventsResponse> => {
    const response = await api.get(`${endpoints.events.root}?filter[eventable_id]=${occurrenceId}`);
    return response;
  },

  getLatestEvents: async (): Promise<EventsResponse> => {
    const response = await api.get(endpoints.events.root);
    return response as EventsResponse;
  },

  getNotifications: async (): Promise<EventsResponse> => {
    const response = await api.get(endpoints.events.notifications);
    return response as EventsResponse;
  },

  create: async (payload: {
    eventable_id: string;
    eventable_type: string;
    description: string;
  }) => {
    await api.post(endpoints.events.root, payload);
  },

  // ✅ Novo método para buscar todos os eventos
  getAll: async (): Promise<EventsResponse> => {
    const response = await api.get(endpoints.events.root);
    return response as EventsResponse;
  },
};
