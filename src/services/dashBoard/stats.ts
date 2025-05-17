import { StatsData } from "../../../types/stats";
import { api } from "../api/api";
import { endpoints } from "../endpoints";

export const statsService = {
  async getStats(): Promise<StatsData> {
    const response = await api.get(endpoints.dashboard.stats);
    return response as StatsData;
  }
};