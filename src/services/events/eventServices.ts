import { EventsResponse } from "../../../types/event";
import { api } from "../api/api";
import { endpoints } from "../endpoints";

export const eventService = {
  getLatestEvents: async (): Promise<EventsResponse> => {
    const response = await api.get(endpoints.events.root);
    console.log('[EVENT SERVICE] Últimos eventos recebidos:', response);
    return response;
  },

  getNotifications: async (): Promise<EventsResponse> => {
    const response = await api.get(endpoints.events.notifications);
    console.log('[EVENT SERVICE] Notificações recebidas:', response);
    return response;
  }
};
