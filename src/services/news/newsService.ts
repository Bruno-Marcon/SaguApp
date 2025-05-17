import { NewsResponse, SingleNewsResponse } from "../../../types/news";
import { api } from "../api/api";
import { endpoints } from "../endpoints";


export const newsService = {
  getNews: async (): Promise<NewsResponse> => {
    const response = await api.get(endpoints.announcements.root);
    return response;
  },

  getNewsById: async (id: string): Promise<SingleNewsResponse> => {
    const response = await api.get(`${endpoints.announcements.root}/${id}`);
    return response;
  }
};
