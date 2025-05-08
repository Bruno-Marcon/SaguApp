import { getToken } from "../../storage/secureToken";
import Constants from "expo-constants";

const apiUrl = Constants.expoConfig?.extra?.apiUrl;
const apiKey = Constants.expoConfig?.extra?.apiKey;

export interface Occurrence {
  title: string;
  description: string;
  createdAt: string;
}

export const getOccurrences = async (): Promise<Occurrence[]> => {
  try {
    const authToken = await getToken();

    if (!authToken) throw new Error("Token de autenticação não encontrado.");

    const response = await fetch(`${apiUrl}/api/v1/occurrencies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
        "X-API-KEY": apiKey,
      },
    });

    const data = await response.json();

    const allOccurrences = data.data;

    if (!Array.isArray(allOccurrences) || allOccurrences.length === 0) {
      throw new Error("Nenhuma ocorrência encontrada.");
    }

    const lastThree = allOccurrences
      .sort((a: any, b: any) => new Date(b.attributes.created_at).getTime() - new Date(a.attributes.created_at).getTime())
      .slice(0, 3)
      .map((item: any) => ({
        title: item.attributes.title,
        description: item.attributes.description,
        createdAt: item.attributes.created_at,
      }));

    return lastThree;
  } catch (error) {
    console.error("Erro ao buscar dados da ocorrência:", error);
    throw new Error("Erro ao buscar dados da ocorrência");
  }
};
