import { endpoints } from "@//services/endpoints";
import { api } from "../api/api";

export async function getSavedExpoToken(): Promise<string | null> {
  try {
    const response = await api.get(endpoints.expoToken.root);
    const token = response?.expo_token ?? null;

    console.log("[NOTIFICATION] Token salvo recuperado:", token);
    return token;
  } catch (error) {
    console.error("[NOTIFICATION] Erro ao buscar expo token salvo:", error);
    return null;
  }
}